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

const cacheMap: Map<string, Partial<AriaAttributes>> = new Map();

const memoize = (func: FunctionType): FunctionType => {
  return (
    ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
  ): Partial<AriaAttributes> => {
    const key = JSON.stringify(ariaAttributes);
    if (!cacheMap.has(key) || !ariaAttributes) {
      const out = func(ariaAttributes);
      cacheMap.set(key, out);
      return out;
    } else {
      return cacheMap.get(key) || {};
    }
  };
};

export const useAriaAttributes = (
  ariaAttributes?: Partial<QwikUiAriaAttributesKebab>
): Partial<AriaAttributes> => {
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
