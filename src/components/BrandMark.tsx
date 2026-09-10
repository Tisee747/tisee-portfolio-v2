type BrandMarkProps = {
  size?: number;
  color?: string;
  cutout?: string;
  className?: string;
};

export function BrandMark({
  size = 34,
  color = "currentColor",
  cutout = "#FFFFFF",
  className,
}: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28 9A23 23 0 0 0 9 28"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M36 9A23 23 0 0 1 55 28"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M55 36A23 23 0 0 1 36 55"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M28 55A23 23 0 0 1 9 36"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <circle cx="9" cy="32" r="3.7" fill={cutout} stroke={color} strokeWidth="2.25" />
      <circle cx="55" cy="32" r="3.7" fill={color} />
      <path d="M20 17H44V24H35.25V42L32 47L28.75 42V24H20V17Z" fill={color} />
    </svg>
  );
}
