import Link from "next/link";
import SectionArtwork from "@/components/SectionArtwork";

const contacts = [
  {
    name: "Email",
    url: "mailto:tisee656@gmail.com",
    external: false,
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/Tisee747",
    external: true,
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 3.221 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/tisee",
    external: true,
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/6285156717713",
    external: true,
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 8.034 0C3.602 0 .003 3.592 0 8.023a7.89 7.89 0 0 0 1.125 4.022L0 16l4.102-1.078a7.88 7.88 0 0 0 3.933 1.072h.003c4.43 0 8.029-3.593 8.032-8.024a7.855 7.855 0 0 0-2.469-5.644M8.038 14.66h-.003a6.55 6.55 0 0 1-3.329-.907l-.238-.142-2.435.639.65-2.37-.155-.243a6.54 6.54 0 0 1-1.007-3.505c.002-3.623 2.957-6.57 6.59-6.57a6.56 6.56 0 0 1 4.645 1.938 6.56 6.56 0 0 1 1.938 4.645c-.003 3.623-2.957 6.57-6.59 6.57m3.615-4.955c-.197-.099-1.17-.578-1.352-.643-.181-.066-.314-.099-.446.1-.132.198-.512.643-.628.775-.116.132-.231.149-.429.05-.197-.1-.832-.307-1.587-.977-.587-.523-.983-1.168-1.099-1.366-.115-.198-.012-.305.087-.403.09-.088.197-.23.296-.346q.148-.172.198-.297c.033-.066.017-.198-.05-.297-.066-.1-.446-1.074-.61-1.47-.16-.39-.323-.337-.446-.343a1 1 0 0 0-.372-.008.71.71 0 0 0-.528.248c-.182.198-.694.677-.694 1.65s.71 1.914.81 2.046c.098.132 1.392 2.145 3.372 3.006.472.205.84.328 1.129.42.475.152.905.13 1.245.08.38-.058 1.171-.48 1.337-.943.165-.462.165-.858.115-.942-.05-.083-.182-.132-.38-.23" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full overflow-hidden bg-white pb-10 pt-10 md:pt-12 lg:pt-14" id="contact">
      <SectionArtwork variant="contact" className="opacity-70 lg:opacity-55" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="max-w-[640px]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">Get in touch</p>
            <h2 className="text-5xl font-medium leading-[1.04] tracking-tighter text-zinc-950 sm:text-6xl lg:text-[60px] lg:leading-[1.02] xl:text-[64px]">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-950 md:text-lg lg:max-w-[540px]">
              Have a role, project, or collaboration in mind? Reach out through whichever channel works best for you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:w-full lg:max-w-[440px] lg:justify-self-end">
            {contacts.map((contact) => (
              <Link
                key={contact.name}
                href={contact.url}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="group inline-flex min-h-12 w-full items-center gap-2.5 rounded-xl border border-zinc-100 bg-white px-3.5 text-sm font-medium text-zinc-950 transition-[border-color,color] hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:px-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center text-zinc-950">
                  {contact.icon}
                </span>
                <span className="truncate">{contact.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-100 pt-6 text-xs text-zinc-950 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <span>&copy; 2026 Tisee. All rights reserved.</span>
          <span>Building practical stuff and learning along the way.</span>
        </div>
      </div>
    </footer>
  );
}
