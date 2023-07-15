import { AriaAttributes } from '@builder.io/qwik';
import {
  QwikUiAriaAttributesKebab,
  isKeyOfAriaAttributes,
  isKeyOfQwikUiAriaAttributes,
} from './aria-attributes.type';

export function keyToKebabCase(str: string): keyof AriaAttributes {
  const newStr = str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
  if (isKeyOfAriaAttributes(newStr)) {
    return newStr;
  } else {
    throw new Error('The key you speficied was not an aria attribute.');
  }
}

type FunctionType = (
  ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
) => Partial<AriaAttributes>;

export const useAriaAttributes = (
  ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
): Partial<AriaAttributes> => {
  const memoize = (func: FunctionType): FunctionType => {
    let cache:
      | { in: string | undefined; out: Partial<AriaAttributes> }
      | undefined;
    return (
      ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
    ): Partial<AriaAttributes> => {
      if (!cache || !ariaAttributes) {
        const out = func(ariaAttributes);
        cache = {
          in: ariaAttributes ? JSON.stringify(ariaAttributes) : undefined,
          out,
        };
        return out;
      } else {
        const newCacheInValue = JSON.stringify(ariaAttributes);
        if (cache.in === newCacheInValue) {
          return cache.out;
        }
        cache = { in: newCacheInValue, out: func(ariaAttributes) };
        return cache.out;
      }
    };
  };
  const process = (
    ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
  ): Partial<AriaAttributes> => {
    return ariaAttributes
      ? Object.keys(ariaAttributes).reduce(
          (cur, key) =>
            isKeyOfQwikUiAriaAttributes(key)
              ? { ...cur, [keyToKebabCase(key)]: ariaAttributes[key] }
              : cur,
          {}
        )
      : {};
  };
  return memoize(process)(ariaAttributes);
};
