import { LANGS, type Lang } from "../i18n/translations";

// Everything a love page needs lives in the URL, so no backend is required.
export type LovePayload = {
  name: string;
  from: string;
  message: string;
  seed: string;
  lang: Lang;
};

export const LIMITS = { name: 60, from: 60, message: 500 } as const;

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
    const { n, f, m, s, l } = data as Record<string, unknown>;

    if (typeof n !== "string" || !n.trim() || n.length > LIMITS.name) return null;
    if (typeof f !== "string" || f.length > LIMITS.from) return null;
    if (typeof m !== "string" || m.length > LIMITS.message) return null;
    if (typeof s !== "string" || !s || s.length > 32) return null;
    if (typeof l !== "string" || !(LANGS as readonly string[]).includes(l)) {
      return null;
    }

    return { name: n, from: f, message: m, seed: s, lang: l as Lang };
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
