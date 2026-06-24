import { Link } from "wouter";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" data-testid="link-home">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#0f2a4a]"
      >
        <path
          d="M12 2L22 7.7735V16.2265L12 22L2 16.2265V7.7735L12 2Z"
          fill="currentColor"
        />
        <path
          d="M15.5 15.5C14.5 16.5 13.3 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.3 7 14.5 7.5 15.5 8.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-semibold text-[#0f2a4a] text-lg tracking-tight">CoastLink</span>
    </Link>
  );
}
