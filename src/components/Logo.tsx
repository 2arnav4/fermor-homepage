export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 text-forest"
      >
        <rect width="24" height="24" rx="6" fill="currentColor" />
        <path
          d="M7 17V7h9M7 12h6"
          stroke="#f5f2ea"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-tight">Fermor</span>
    </span>
  );
}
