import Link from "next/link";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tone = "light" | "dark";

const TONE: Record<Tone, { base: string; border: string; hover: string }> = {
  light: {
    base: "text-fg",
    border: "border-border/80",
    hover: "group-hover:border-accent group-hover:text-accent",
  },
  dark: {
    base: "text-[#E0E6ED]",
    border: "border-[#E0E6ED]/30",
    hover: "group-hover:border-[#E8A359] group-hover:text-[#E8A359]",
  },
};

interface ActionButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: Tone;
  fullWidth?: boolean;
  className?: string;
}

export default function ActionButton({
  label,
  href,
  onClick,
  tone = "light",
  fullWidth = false,
  className = "",
}: ActionButtonProps) {
  const t = TONE[tone];
  const width = fullWidth ? "w-full" : "w-full sm:w-fit";

  const inner = (
    <span
      className={`inline-flex ${width} items-stretch border ${t.border} ${t.base} text-xs font-medium transition-colors duration-500 ease-out ${t.hover} sm:text-sm`}
    >
      <span className="flex flex-1 items-center px-4 py-2.5 sm:px-6">{label}</span>
      <span
        className={`relative flex w-10 shrink-0 items-center justify-center overflow-hidden border-l ${t.border} transition-colors duration-500 ease-out ${t.hover}`}
      >
        <ArrowIcon className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[250%]" />
        <ArrowIcon className="absolute -translate-x-[250%] transition-transform duration-500 ease-out group-hover:translate-x-0" />
      </span>
    </span>
  );

  const groupClass = `group inline-flex ${width} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link 
        href={href} 
        className={groupClass}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={groupClass}>
      {inner}
    </button>
  );
}
