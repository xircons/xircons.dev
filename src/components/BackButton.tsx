"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group mb-12 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/50 transition-colors hover:text-fg"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:-translate-x-1"
      >
        <path
          d="M6 13L1 7l5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  );
}
