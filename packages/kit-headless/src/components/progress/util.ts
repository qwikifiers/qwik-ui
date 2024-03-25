export type ProgressState = 'indeterminate' | 'complete' | 'loading';

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isValidMaxNumber(max: any): max is number {
  return isNumber(max) && !isNaN(max) && max > 0;
}

export function isValidValueNumber(value: any, max: number): value is number {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}

export function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

export function getProgressState(
  value: number | undefined | null,
  maxValue: number,
): ProgressState {
  return value == null ? 'indeterminate' : value === maxValue ? 'complete' : 'loading';
}
