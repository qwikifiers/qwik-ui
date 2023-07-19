export type AriaKeysOnlyKebab<T> = {
  [K in keyof T as K extends `aria-${string}` ? K : never]: T[K];
};
