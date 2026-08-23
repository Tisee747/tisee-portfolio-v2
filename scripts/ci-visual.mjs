import { chromium } from '@playwright/test';
import fs from 'node:fs';

const baseURL = 'http://127.0.0.1:3000';
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

async function revealPage(page, viewportHeight) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += Math.max(360, Math.floor(viewportHeight * 0.72))) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
}

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => pageErrors.push(err.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await revealPage(page, viewport.height);
  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const h1 = document.querySelector('h1');
    const images = [...document.images].map((img) => ({ src: img.currentSrc || img.src, complete: img.complete, naturalWidth: img.naturalWidth }));
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      h1Text: h1?.textContent?.replace(/\s+/g, ' ').trim() || '',
      orbPresent: Boolean(document.querySelector('.signal-orb')),
      contactPresent: Boolean(document.querySelector('#contact')),
      font: getComputedStyle(document.body).fontFamily,
      background: getComputedStyle(document.body).backgroundColor,
      brokenImages: images.filter((img) => !img.complete || img.naturalWidth === 0),
    };
  });
  await page.screenshot({ path: `${outDir}/${viewport.name}.png`, fullPage: true });
  if (metrics.scrollWidth > metrics.clientWidth) failures.push(`${viewport.name}: horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
  if (!metrics.h1Text.includes('Backend systems.') || !metrics.h1Text.includes('Applied intelligence.')) failures.push(`${viewport.name}: hero markers missing`);
  if (!metrics.orbPresent) failures.push(`${viewport.name}: orb missing`);
  if (!metrics.contactPresent) failures.push(`${viewport.name}: contact missing`);
  if (metrics.brokenImages.length) failures.push(`${viewport.name}: ${metrics.brokenImages.length} broken images`);
  if (consoleErrors.length) failures.push(`${viewport.name}: ${consoleErrors.length} console errors`);
  if (pageErrors.length) failures.push(`${viewport.name}: ${pageErrors.length} page errors`);
  if (viewport.width <= 390) {
    const button = page.locator('button[aria-label="Toggle menu"]');
    await button.click();
    if (await button.getAttribute('aria-expanded') !== 'true') failures.push(`${viewport.name}: menu open failed`);
    await button.click();
    if (await button.getAttribute('aria-expanded') !== 'false') failures.push(`${viewport.name}: menu close failed`);
  }
  results.push({ viewport, metrics, consoleErrors, pageErrors });
  await context.close();
}

const resizeContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const resizePage = await resizeContext.newPage();
await resizePage.goto(baseURL, { waitUntil: 'networkidle' });
await resizePage.locator('button[aria-label="Toggle menu"]').click();
await resizePage.setViewportSize({ width: 1100, height: 900 });
await resizePage.waitForTimeout(300);
const resizeExpanded = await resizePage.evaluate(() => document.querySelector('button[aria-label="Toggle menu"]')?.getAttribute('aria-expanded'));
if (resizeExpanded !== 'false') failures.push(`resize reset failed (${resizeExpanded})`);
await resizeContext.close();

const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
await revealPage(reducedPage, 900);
if (!(await reducedPage.locator('h1').isVisible()) || !(await reducedPage.locator('#projects').isVisible()) || !(await reducedPage.locator('#contact').isVisible())) failures.push('reduced-motion hides key content');
await reducedContext.close();

await browser.close();
const summary = { ok: failures.length === 0, failures, results };
fs.writeFileSync(`${outDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
