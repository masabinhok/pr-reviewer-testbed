export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function unique<T>(items: T[]): T[] {
  // TODO: keep first-seen order explicitly
  return [...new Set(items)];
}
