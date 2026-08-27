import Link from "next/link";

const contacts = [
  { label: "Email", value: "tisee656@gmail.com", href: "mailto:tisee656@gmail.com", mark: "EM" },
  { label: "GitHub", value: "github.com/Tisee747", href: "https://github.com/Tisee747", mark: "GH" },
  { label: "LinkedIn", value: "linkedin.com/in/tisee", href: "https://linkedin.com/in/tisee", mark: "IN" },
  { label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/6285156717713", mark: "WA" },
  { label: "Telegram", value: "@NotBul77", href: "https://t.me/NotBul77", mark: "TG" },
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full border-t border-zinc-100 bg-white px-6 pb-10 pt-24 md:px-12 md:pb-12 md:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-600">Contact</div>
            <h2 className="max-w-[700px] text-[clamp(54px,8vw,108px)] font-semibold leading-[0.88] tracking-[-0.07em] text-zinc-900">
              LET’S WORK<br />TOGETHER
            </h2>

            <div className="mt-10 max-w-xl">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-zinc-900 md:text-2xl">
                Looking for the next useful problem to solve.
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-500">
                Open to backend engineering, software development, and applied AI opportunities.
              </p>
            </div>

            <Link
              href="/resume.pdf"
              target="_blank"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              View Resume
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {contacts.map((contact, index) => (
              <Link
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[46px_1fr_auto] items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.05)] sm:p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-[10px] font-semibold tracking-[0.08em] text-zinc-700">
                  {contact.mark}
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-blue-600">{contact.label}</span>
                  <span className="mt-1 block truncate text-sm font-semibold text-zinc-900 sm:text-base">{contact.value}</span>
                </span>
                <span className="text-sm text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-900">
                  {String(index + 1).padStart(2, "0")} ↗
                </span>
              </Link>
            ))}

            <Link
              href="mailto:tisee656@gmail.com"
              className="group mt-3 flex items-center justify-center gap-2 rounded-full border border-zinc-900 px-5 py-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Send Me a Message
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-zinc-100 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Tisee. All rights reserved.</span>
          <span>Backend engineering · Applied AI</span>
        </div>
      </div>
    </footer>
  );
}
