import { LANGS, type Lang } from "../i18n/translations";
import {
  DEFAULT_EXPERIENCE,
  EXPERIENCES,
  type Experience,
} from "../constants/experiences";
import {
  DEFAULT_PALETTE,
  PALETTE_IDS,
  type PaletteId,
} from "../constants/palettes";
import {
  DEFAULT_NAME_MODE,
  NAME_MODES,
  type NameMode,
} from "../constants/nameMode";

// Everything a love page needs lives in the URL, so no backend is required.
export type LovePayload = {
  name: string;
  from: string;
  message: string;
  seed: string;
  lang: Lang;
  experience: Experience;
  palette: PaletteId;
  nameMode: NameMode;
  /** Optional pet name used instead of the name inside some reasons. */
  nickname: string;
  /** Epoch ms after which the link stops working. 0 means "no expiry recorded". */
  expiresAt: number;
};

export const LIMITS = { name: 60, from: 60, message: 500, nickname: 30 } as const;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const padded = text.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function encodePayload(payload: LovePayload): string {
  const json = JSON.stringify({
    n: payload.name,
    f: payload.from,
    m: payload.message,
    s: payload.seed,
    l: payload.lang,
    x: payload.experience,
    p: payload.palette,
    k: payload.nameMode,
    a: payload.nickname,
    e: payload.expiresAt,
  });
  return toBase64Url(new TextEncoder().encode(json));
}

// Links are untrusted input: validate every field before using it.
export function decodePayload(token: string | undefined): LovePayload | null {
  if (!token || token.length > 4000) return null;
  try {
    const data: unknown = JSON.parse(
      new TextDecoder().decode(fromBase64Url(token)),
    );
    if (typeof data !== "object" || data === null) return null;
    const { n, f, m, s, l, x, p, k, a, e } = data as Record<string, unknown>;

    if (typeof n !== "string" || !n.trim() || n.length > LIMITS.name) return null;
    if (typeof f !== "string" || f.length > LIMITS.from) return null;
    if (typeof m !== "string" || m.length > LIMITS.message) return null;
    if (typeof s !== "string" || !s || s.length > 32) return null;
    if (typeof l !== "string" || !(LANGS as readonly string[]).includes(l)) {
      return null;
    }

    // Older links have none of the newer fields: fall back to defaults
    // (and to expiresAt 0, which counts as already expired).
    if (
      x !== undefined &&
      !(typeof x === "string" && (EXPERIENCES as readonly string[]).includes(x))
    ) {
      return null;
    }
    if (
      p !== undefined &&
      !(typeof p === "string" && (PALETTE_IDS as readonly string[]).includes(p))
    ) {
      return null;
    }
    if (
      k !== undefined &&
      !(typeof k === "string" && (NAME_MODES as readonly string[]).includes(k))
    ) {
      return null;
    }
    if (a !== undefined && (typeof a !== "string" || a.length > LIMITS.nickname)) {
      return null;
    }
    const expiresAt = typeof e === "number" && Number.isFinite(e) ? e : 0;

    return {
      name: n,
      from: f,
      message: m,
      seed: s,
      lang: l as Lang,
      experience: (x as Experience | undefined) ?? DEFAULT_EXPERIENCE,
      palette: (p as PaletteId | undefined) ?? DEFAULT_PALETTE,
      nameMode: (k as NameMode | undefined) ?? DEFAULT_NAME_MODE,
      nickname: (a as string | undefined) ?? "",
      expiresAt,
    };
  } catch {
    return null;
  }
}

export function randomSeed(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function buildLoveUrl(payload: LovePayload): string {
  return `${window.location.origin}/love/${encodePayload(payload)}`;
}
