// How often the person's name (or pet name) appears inside the reasons themselves.
export const NAME_MODES = ["never", "sometimes", "always"] as const;
export type NameMode = (typeof NAME_MODES)[number];

export const DEFAULT_NAME_MODE: NameMode = "sometimes";
