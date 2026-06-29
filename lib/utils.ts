export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function fibonacciSphere(
  n: number,
  radius: number
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}
