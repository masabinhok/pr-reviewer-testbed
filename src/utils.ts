export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
