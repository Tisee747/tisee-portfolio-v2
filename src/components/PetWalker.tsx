export default function PetWalker() {
  return (
    <div className="tisee-pet-runner" aria-hidden="true">
      <div className="tisee-pet-shadow" />
      <div className="tisee-pet-roll">
        <div className="tisee-pet-squish">
          <svg
            viewBox="0 0 92 76"
            role="presentation"
            focusable="false"
            shapeRendering="geometricPrecision"
          >
            <g className="tisee-panda">
              <circle cx="27" cy="20" r="10" fill="#18181B" />
              <circle cx="65" cy="20" r="10" fill="#18181B" />

              <ellipse
                cx="46"
                cy="41"
                rx="31"
                ry="28"
                fill="#FFFFFF"
                stroke="#18181B"
                strokeWidth="3.5"
              />

              <ellipse cx="24" cy="49" rx="8" ry="13" fill="#18181B" transform="rotate(28 24 49)" />
              <ellipse cx="68" cy="49" rx="8" ry="13" fill="#18181B" transform="rotate(-28 68 49)" />
              <ellipse cx="33" cy="62" rx="8" ry="6" fill="#18181B" transform="rotate(-18 33 62)" />
              <ellipse cx="59" cy="62" rx="8" ry="6" fill="#18181B" transform="rotate(18 59 62)" />

              <ellipse cx="34" cy="36" rx="8" ry="10" fill="#18181B" transform="rotate(28 34 36)" />
              <ellipse cx="58" cy="36" rx="8" ry="10" fill="#18181B" transform="rotate(-28 58 36)" />
              <circle cx="35" cy="36" r="2.6" fill="#FFFFFF" />
              <circle cx="57" cy="36" r="2.6" fill="#FFFFFF" />
              <circle cx="35.7" cy="35.4" r="1" fill="#60A5FA" />
              <circle cx="57.7" cy="35.4" r="1" fill="#60A5FA" />

              <path
                d="M42 45C44 43 48 43 50 45C50 48 48 50 46 50C44 50 42 48 42 45Z"
                fill="#18181B"
              />
              <path
                d="M46 50C46 53 43 54 41 53M46 50C46 53 49 54 51 53"
                fill="none"
                stroke="#18181B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M67 28C72 30 75 34 76 39"
                fill="none"
                stroke="#2563EB"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="76" cy="40" r="3" fill="#2563EB" stroke="#18181B" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
