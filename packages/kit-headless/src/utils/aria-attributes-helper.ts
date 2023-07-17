/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExtendedPropsByAriaAttribute,
  QwikAriaAttributeCamelCaseElement,
  QwikIntrinsicAriaAttributes,
  QwikUiAreaAttributesFunctionReturnType,
  QwikUiAreaAttributesFunctionType,
  isKeyOfQwikCamelAriaAttributes,
  isKeyOfQwikIntrinsicAriaAttributes,
} from './aria-attributes.type';

export function keyToKebabCase(
  str: string
): keyof QwikIntrinsicAriaAttributes<string> {
  const newStr = str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase();
  if (isKeyOfQwikIntrinsicAriaAttributes(newStr)) {
    return newStr;
  } else {
    throw new Error('The key you speficied was not an aria attribute.');
  }
}

const cacheMap = new Map();

const memoize = <K extends string>(
  func: QwikUiAreaAttributesFunctionType<K>
): QwikUiAreaAttributesFunctionType<K> => {
  return (
    qwikUiAriaAttributes?: Partial<QwikAriaAttributeCamelCaseElement<K>>,
    lastKey?: string
  ): ReturnType<QwikUiAreaAttributesFunctionType<K>> => {
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

export const extractCamelAriaAttributes = <K extends string, T = any>(
  props: ExtendedPropsByAriaAttribute<K, T>
) => {
  if (!props) {
    return {};
  }
  return Object.keys(props).reduce(
    (cur, propKey) =>
      isKeyOfQwikCamelAriaAttributes(propKey)
        ? { ...cur, [propKey]: props[propKey] }
        : cur,
    {}
  );
};

export const getAriaAttributes = <K extends string, T = any>(
  props: ExtendedPropsByAriaAttribute<K, T>,
  lastKey?: string
): QwikUiAreaAttributesFunctionReturnType<K> => {
  const process = (
    qwikUiAriaAttributes?: Partial<QwikAriaAttributeCamelCaseElement<K>>
  ): ReturnType<QwikUiAreaAttributesFunctionType<K>> => {
    return {
      lastKey: JSON.stringify(qwikUiAriaAttributes),
      ariaAttributes: qwikUiAriaAttributes
        ? Object.keys(qwikUiAriaAttributes).reduce(
            (cur, key) =>
              isKeyOfQwikCamelAriaAttributes(key)
                ? { ...cur, [keyToKebabCase(key)]: qwikUiAriaAttributes[key] }
                : cur,
            {}
          )
        : {},
    };
  };
  const qwikUiAriaAttributes = extractCamelAriaAttributes<K, T>(props);
  return memoize(process)(qwikUiAriaAttributes, lastKey);
};
