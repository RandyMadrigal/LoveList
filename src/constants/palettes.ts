export const PALETTE_IDS = [
  "rose",
  "sunset",
  "midnight",
  "lavender",
  "mint",
  "gold",
] as const;
export type PaletteId = (typeof PALETTE_IDS)[number];

export const DEFAULT_PALETTE: PaletteId = "rose";

type Palette = {
  from: string;
  to: string;
  accent: string;
  glow: string;
};

// All palettes are dark backgrounds so white text keeps its contrast
export const PALETTES: Record<PaletteId, Palette> = {
  rose: { from: "#2a0a1c", to: "#8a1c3f", accent: "#ff7fa6", glow: "#ff3d7f" },
  sunset: { from: "#2b0f1a", to: "#b3401f", accent: "#ffb04c", glow: "#ff7a45" },
  midnight: { from: "#070b24", to: "#2a2f7a", accent: "#9aa9ff", glow: "#5b6cff" },
  lavender: { from: "#1d0b30", to: "#6a3fb0", accent: "#dcb4ff", glow: "#a76bff" },
  mint: { from: "#04211c", to: "#0f7a63", accent: "#7ff0c8", glow: "#2fd6a8" },
  gold: { from: "#241706", to: "#a8721a", accent: "#ffd36b", glow: "#f5b93a" },
};

export function paletteBackground(id: PaletteId): string {
  const p = PALETTES[id];
  return `radial-gradient(90% 70% at 50% 25%, color-mix(in srgb, ${p.glow} 55%, transparent), transparent 70%), linear-gradient(160deg, ${p.from}, ${p.to})`;
}
