export const EXPERIENCES = ["story", "envelope", "lyrics", "scroll"] as const;
export type Experience = (typeof EXPERIENCES)[number];

export const DEFAULT_EXPERIENCE: Experience = "story";

// A shared link stops working this long after it was created.
export const LINK_TTL_MS = 24 * 60 * 60 * 1000;
