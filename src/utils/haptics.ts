const KEY = "haptics";

export function hapticsSupported(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export function hapticsEnabled(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setHapticsEnabled(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
}

// Haptics fire on the same event as the visual change; short and rare on purpose.
export function vibrate(pattern: number | number[]): void {
  if (!hapticsSupported() || !hapticsEnabled()) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  navigator.vibrate(pattern);
}
