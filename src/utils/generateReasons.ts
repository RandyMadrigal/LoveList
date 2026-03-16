import { LOVE_REASONS } from "../constants/loveReasons";
import { seededRandom } from "./seededRandom";

export function generateReasons(
  name: string,
  seed: string,
  count = 50,
): string[] {
  const random = seededRandom(seed);

  const shuffled = [...LOVE_REASONS].sort(() => random() - 0.5);

  return shuffled.slice(0, count).map((reason) => `${reason}, ${name}.`);
}
