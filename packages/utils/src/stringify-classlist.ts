import { ClassList } from '@builder.io/qwik';

export const isArray = (v: unknown): v is unknown[] => {
  return Array.isArray(v);
};

export const isString = (v: unknown): v is string => {
  return typeof v === 'string';
};

export function stringifyClassList(classList: ClassList): string {
  if (!classList) {
    return '';
  }
  if (isString(classList)) {
    return classList.trim();
  }

  if (isArray(classList)) {
    return classList.reduce((result: string, o) => {
      const classList = stringifyClassList(o);
      return classList ? (result ? `${result} ${classList}` : classList) : result;
    }, '');
  }

  return Object.entries(classList).reduce(
    (result, [key, value]) =>
      value ? (result ? `${result} ${key.trim()}` : key.trim()) : result,
    '',
  );
}
