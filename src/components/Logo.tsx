export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#E8541A" />
        </linearGradient>
        <clipPath id="circle">
          <circle cx="100" cy="100" r="98" />
        </clipPath>
      </defs>
      {/* Top-left quadrant: Purple */}
      <path d="M100,100 L100,2 A98,98,0,0,0,2,100 Z" fill="#9536B6" clipPath="url(#circle)" />
      {/* Bottom-left quadrant: Orange gradient */}
      <path d="M100,100 L2,100 A98,98,0,0,0,100,198 Z" fill="url(#orangeGrad)" clipPath="url(#circle)" />
      {/* Bottom-right quadrant: Red */}
      <path d="M100,100 L100,198 A98,98,0,0,0,198,100 Z" fill="#CC1515" clipPath="url(#circle)" />
      {/* Green pill in top-right area */}
      <rect x="110" y="78" width="74" height="22" rx="11" fill="#2A8C3A" clipPath="url(#circle)" />
    </svg>
  );
}
