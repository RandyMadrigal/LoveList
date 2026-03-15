import { nanoid } from "nanoid";

export function generateSlug(text: string): string {
  const cleanText = text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const uniqueId = nanoid(6);

  return `${cleanText}-${uniqueId}`;
}
