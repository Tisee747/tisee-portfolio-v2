import { chromium } from '@playwright/test';
import fs from 'node:fs';

const baseURL = process.env.TEST_URL || 'http://127.0.0.1:3000';
const outDir = 'artifacts/visual-qa';
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 800 },
];

const failures = [];
const results = [];
const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/${viewport.name}.png`, fullPage: true });

  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const h1 = document.querySelector('h1');
    const orb = document.querySelector('.signal-orb');
    const images = [...document.images].map((img) => ({ src: img.currentSrc || img.src, complete: img.complete, naturalWidth: img.naturalWidth }));
    const contact = document.querySelector('#contact');
    const font = getComputedStyle(document.body).fontFamily;
    const bg = getComputedStyle(document.body).backgroundColor;
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      h1Text: h1?.textContent?.replace(/\s+/g, ' ').trim() || '',
      orbPresent: Boolean(orb),
      contactPresent: Boolean(contact),
      font,
      bg,
      brokenImages: images.filter((img) => !img.complete || img.naturalWidth === 0),
    };
  });

  const overflow = metrics.scrollWidth > metrics.clientWidth;
  const heroOK = metrics.h1Text.includes('Backend systems.') && metrics.h1Text.includes('Applied intelligence.');
  if (overflow) failures.push(`${viewport.name}: horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
  if (!heroOK) failures.push(`${viewport.name}: new hero markers missing`);
  if (!metrics.orbPresent) failures.push(`${viewport.name}: system-profile orb missing`);
  if (!metrics.contactPresent) failures.push(`${viewport.name}: contact section missing`);
  if (metrics.brokenImages.length) failures.push(`${viewport.name}: ${metrics.brokenImages.length} broken image(s)`);
  if (consoleErrors.length) failures.push(`${viewport.name}: ${consoleErrors.length} console error(s)`);
  if (pageErrors.length) failures.push(`${viewport.name}: ${pageErrors.length} page error(s)`);

  if (viewport.width <= 390) {
    const button = page.getByRole('button', { name: 'Toggle menu' });
    await button.click();
    const expanded = await button.getAttribute('aria-expanded');
    if (expanded !== 'true') failures.push(`${viewport.name}: mobile menu did not open`);
    await button.click();
    const closed = await button.getAttribute('aria-expanded');
    if (closed !== 'false') failures.push(`${viewport.name}: mobile menu did not close`);
  }

  results.push({ viewport, metrics, consoleErrors, pageErrors });
  await context.close();
}

const resizeContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const resizePage = await resizeContext.newPage();
await resizePage.goto(baseURL, { waitUntil: 'networkidle' });
const resizeButton = resizePage.getByRole('button', { name: 'Toggle menu' });
await resizeButton.click();
await resizePage.setViewportSize({ width: 1100, height: 900 });
await resizePage.waitForTimeout(250);
const resizeExpanded = await resizeButton.getAttribute('aria-expanded');
if (resizeExpanded !== 'false') failures.push('mobile-to-desktop resize did not reset menu state');
await resizeContext.close();

const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
const reducedVisible = await reducedPage.locator('h1').isVisible() && await reducedPage.locator('#projects').isVisible() && await reducedPage.locator('#contact').isVisible();
if (!reducedVisible) failures.push('reduced-motion mode hides key content');
await reducedContext.close();

await browser.close();

const summary = { ok: failures.length === 0, failures, results };
fs.writeFileSync(`${outDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
