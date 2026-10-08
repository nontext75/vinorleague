const defaultEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Read motion settings from the shared CSS tokens so page animations stay in sync. */
export function readMotionToken(name: string, fallback: number) {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function readMotionEase(name = '--motion-ease-out'): [number, number, number, number] {
  if (typeof window === 'undefined') return defaultEase;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  const points = value.match(/-?\d*\.?\d+/g)?.map(Number);
  return points?.length === 4 ? [points[0], points[1], points[2], points[3]] : defaultEase;
}
