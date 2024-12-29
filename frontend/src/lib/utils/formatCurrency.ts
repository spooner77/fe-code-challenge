export function formatCurrency(value: number | undefined, currncy:string = "$", maxDecimalCount = 1): string {
  if (value === undefined || isNaN(value) || !isFinite(value)) {
    return "--";
  }

  return `${currncy}${formatAmount(value, maxDecimalCount)}`;
}

function formatAmount(value: number, maxDecimalCount: number): string {
  if (value >= 1000_000_000_000) {
    return `${toFixed(value/1000_000_000_000, maxDecimalCount)}T`;
  }

  if (value >= 1000_000_000) {
    return `${toFixed(value/1000_000_000, maxDecimalCount)}B`;
  }

  if (value >= 1000_000) {
    return `${toFixed(value/1000_000, maxDecimalCount)}M`;
  }

  if (value >= 1000) {
    return `${toFixed(value/1000_000, maxDecimalCount)}K`;
  }

  return toFixed(value, 0).toString();
}

function toFixed(value: number, maxDecimalCount: number) {
  const decimalPart = Math.pow(10, maxDecimalCount);
  return Math.floor(value * decimalPart) / decimalPart;
}