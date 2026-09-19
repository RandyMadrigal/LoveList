import confetti from "canvas-confetti";

export function celebrate(particleCount = 100): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  confetti({ particleCount, spread: 75, origin: { y: 0.6 } });
}
