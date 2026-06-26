"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FormStateClearer() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname !== "/contact" &&
      pathname !== "/terms" &&
      pathname !== "/privacy"
    ) {
      sessionStorage.removeItem("contactFormState");
    }
  }, [pathname]);

  return null;
}
