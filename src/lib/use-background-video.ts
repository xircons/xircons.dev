import { useSyncExternalStore } from "react";

const DESKTOP = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(DESKTOP).matches && !connection?.saveData;
}

// The background video is 2.8 MB, so phones and Save-Data connections get the poster instead.
// Returns null during server render and hydration, before the viewport is known.
export function useBackgroundVideo() {
  return useSyncExternalStore<boolean | null>(subscribe, getSnapshot, () => null);
}
