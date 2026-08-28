type SectionArtworkProps = {
  variant: "experience" | "capabilities" | "projects" | "contact" | "archive" | "cta";
  className?: string;
};

export default function SectionArtwork({ variant, className = "" }: SectionArtworkProps) {
  if (variant === "experience") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 420 260" className="absolute -right-20 top-10 h-56 w-80 sm:right-0 sm:h-64 sm:w-[26rem]" fill="none">
          <path d="M52 38H362" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M98 78H326" stroke="#F0F0F1" strokeWidth="1" />
          <path d="M142 118H382" stroke="#E4E4E7" strokeWidth="1" />
          <circle cx="98" cy="78" r="5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
          <rect x="306" y="28" width="64" height="64" rx="18" stroke="#E4E4E7" strokeWidth="1" transform="rotate(12 306 28)" />
        </svg>
      </div>
    );
  }

  if (variant === "capabilities") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 1200 160" className="absolute inset-x-0 top-1/2 h-32 w-full -translate-y-1/2" fill="none" preserveAspectRatio="none">
          <path d="M40 80H210M990 80H1160" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M92 54V106M1108 54V106" stroke="#F0F0F1" strokeWidth="1" />
          <circle cx="210" cy="80" r="4" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
          <circle cx="990" cy="80" r="4" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 360 300" className="absolute -left-28 top-14 h-72 w-80 sm:-left-10" fill="none">
          <circle cx="120" cy="142" r="76" stroke="#E4E4E7" strokeWidth="1" />
          <circle cx="120" cy="142" r="104" stroke="#F0F0F1" strokeWidth="1" />
          <path d="M218 56H310M264 18V110" stroke="#E4E4E7" strokeWidth="1" />
          <circle cx="120" cy="38" r="4" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 420 260" className="absolute -right-24 bottom-8 h-64 w-[26rem] sm:-right-4" fill="none">
          <path d="M88 242C116 126 198 54 342 30" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M138 252C164 156 230 96 362 70" stroke="#F0F0F1" strokeWidth="1" />
          <circle cx="342" cy="30" r="5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
          <circle cx="298" cy="96" r="3" fill="#D4D4D8" />
          <circle cx="326" cy="118" r="2" fill="#E4E4E7" />
        </svg>
      </div>
    );
  }

  if (variant === "archive") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        <svg viewBox="0 0 480 320" className="absolute -right-36 top-8 h-72 w-[30rem] sm:-right-12 sm:h-80" fill="none">
          <path d="M108 52L392 206" stroke="#E4E4E7" strokeWidth="1" />
          <path d="M78 96L354 246" stroke="#F0F0F1" strokeWidth="1" />
          <path d="M236 24V298" stroke="#F0F0F1" strokeWidth="1" />
          <circle cx="236" cy="128" r="72" stroke="#E4E4E7" strokeWidth="1" />
          <circle cx="236" cy="128" r="5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 900 100" className="absolute left-1/2 top-1/2 h-20 w-[52rem] max-w-[120%] -translate-x-1/2 -translate-y-1/2" fill="none">
        <path d="M36 50H320M580 50H864" stroke="#F0F0F1" strokeWidth="1" />
        <circle cx="338" cy="50" r="3.5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
        <circle cx="562" cy="50" r="3.5" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1" />
      </svg>
    </div>
  );
}
