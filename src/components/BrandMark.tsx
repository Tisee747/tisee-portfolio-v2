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
        d="M9 28C10.8 18 19 10.8 28 9"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M36 9C45 10.8 53.2 18 55 28"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M55 36C53.2 46 45 53.2 36 55"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M28 55C19 53.2 10.8 46 9 36"
        stroke={color}
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <circle cx="9" cy="32" r="3.7" fill={cutout} stroke={color} strokeWidth="2.25" />
      <circle cx="55" cy="32" r="3.7" fill={color} />
      <path
        d="M20.5 17.5L43.5 14.5L44.4 21.1L36.8 22.1L35.2 42.1L31.4 47L27.8 43.7L29.3 23L21.1 24.1L20.5 17.5Z"
        fill={color}
      />
    </svg>
  );
}
