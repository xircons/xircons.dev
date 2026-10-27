import { useSyncExternalStore } from "react";

// Hover keeps landscape phones and touch tablets on the poster.
export const DESKTOP = "(min-width: 768px) and (hover: hover)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(DESKTOP).matches && !connection?.saveData;
}

// The background video is 2.8 MB, so touch devices and Save-Data connections get the poster instead.
// Returns null during server render and hydration, before the viewport is known.
export function useBackgroundVideo() {
  return useSyncExternalStore<boolean | null>(subscribe, getSnapshot, () => null);
}
