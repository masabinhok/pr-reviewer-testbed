export function formatDate(date: Date): string {
  console.log('formatting', date);
  return date.toISOString().slice(0, 10);
}
