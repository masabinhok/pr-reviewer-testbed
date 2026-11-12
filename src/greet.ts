export function greet(name: string): string {
  console.log('greeting', name);
  return `Hello, ${name}!`;
}

export function farewell(name: string): string {
  return `Goodbye, ${name}!`;
}
