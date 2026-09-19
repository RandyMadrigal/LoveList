// Where a flick would come to rest, using the same exponential-decay projection
// as scroll deceleration (velocity in px/s, result in px).
export function project(velocity: number, decelerationRate = 0.99): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
