export function formatCompactNumber(
  value: number,
  options?: {
    maximumFractionDigits?: number;
  },
) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: options?.maximumFractionDigits ?? 1,
  }).format(value);
}
