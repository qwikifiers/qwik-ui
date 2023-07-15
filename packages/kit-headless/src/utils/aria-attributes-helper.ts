/* eslint-disable @typescript-eslint/no-explicit-any */
import { AriaAttributes } from '@builder.io/qwik';
import {
  ExtendedPropsByAriaAttribute,
  QwikUiAreaAttributesFunctionType,
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

const cacheMap: Map<string, Partial<AriaAttributes>> = new Map();

const memoize = (
  func: QwikUiAreaAttributesFunctionType
): QwikUiAreaAttributesFunctionType => {
  return (
    qwikUiAriaAttributes?: Partial<QwikUiAriaAttributesKebab>,
    lastKey?: string
  ): ReturnType<QwikUiAreaAttributesFunctionType> => {
    const key = JSON.stringify(qwikUiAriaAttributes);
    if (lastKey) {
      cacheMap.delete(lastKey);
    }
    if (!cacheMap.has(key) || !qwikUiAriaAttributes) {
      const { ariaAttributes } = func(qwikUiAriaAttributes);
      cacheMap.set(key, ariaAttributes);
      return { lastKey: key, ariaAttributes };
    } else {
      return { lastKey: key, ariaAttributes: cacheMap.get(key) || {} };
    }
  };
};

export const extractQwikUiAriaAttributes = <T = any>(
  props: ExtendedPropsByAriaAttribute<T>
) => {
  return Object.keys(props).reduce(
    (cur, propKey) =>
      isKeyOfQwikUiAriaAttributes(propKey)
        ? { ...cur, [propKey]: props[propKey] }
        : cur,
    {}
  );
};

export const getAriaAttributes = <T = any>(
  props: ExtendedPropsByAriaAttribute<T>,
  lastKey?: string
): ReturnType<QwikUiAreaAttributesFunctionType> => {
  const process = (
    qwikUiAriaAttributes?: Partial<QwikUiAriaAttributesKebab>
  ): ReturnType<QwikUiAreaAttributesFunctionType> => {
    return {
      lastKey: JSON.stringify(qwikUiAriaAttributes),
      ariaAttributes: qwikUiAriaAttributes
        ? Object.keys(qwikUiAriaAttributes).reduce(
            (cur, key) =>
              isKeyOfQwikUiAriaAttributes(key)
                ? { ...cur, [keyToKebabCase(key)]: qwikUiAriaAttributes[key] }
                : cur,
            {}
          )
        : {},
    };
  };
  const qwikUiAriaAttributes = extractQwikUiAriaAttributes<T>(props);
  return memoize(process)(qwikUiAriaAttributes, lastKey);
};
