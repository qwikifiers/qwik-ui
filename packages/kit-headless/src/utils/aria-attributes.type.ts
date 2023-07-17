import { QwikIntrinsicElements } from '@builder.io/qwik';
// import { propertiesOf } from 'ts-reflection';

type ToCamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<ToCamelCase<Tail>>}`
  : S;

type StringValueKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type AnyKeyOfQwikIntrinsicElement<K extends string> = StringValueKeys<
  QwikIntrinsicElements[K]
>;

type AriaKeysOnlyCamel<T> = {
  [K in keyof T as K extends `aria-${string}` ? ToCamelCase<K> : never]: T[K];
};

type AriaKeysOnlySnake<T> = {
  [K in keyof T as K extends `aria-${string}` ? K : never]: T[K];
};

export type QwikAriaAttributeCamelCaseElement<K extends string> =
  K extends string ? AriaKeysOnlyCamel<QwikIntrinsicElements[K]> : undefined;

export type QwikIntrinsicAriaAttributes<K extends string> = K extends string
  ? AriaKeysOnlySnake<QwikIntrinsicElements[K]>
  : undefined;

export type ExtendedPropsByAriaAttribute<
  K extends string,
  T = undefined
> = T extends object
  ? K extends undefined
    ? T
    : T & QwikAriaAttributeCamelCaseElement<K extends string ? K : undefined>
  : T extends undefined
  ? K extends undefined
    ? object
    : QwikAriaAttributeCamelCaseElement<K extends string ? K : undefined>
  : never;

export type QwikUiAreaAttributesFunctionType<K extends string> = (
  ariaAttributes?: Partial<QwikAriaAttributeCamelCaseElement<K>>,
  lastKey?: string
) => {
  lastKey: string;
  ariaAttributes: Partial<QwikIntrinsicAriaAttributes<K>>;
};

export type QwikUiAreaAttributesFunctionReturnType<K extends string> =
  ReturnType<QwikUiAreaAttributesFunctionType<K>>;

export function isKeyOfQwikCamelAriaAttributes(
  key: string
): key is keyof QwikAriaAttributeCamelCaseElement<string> {
  // const ariaAttributeKeys = propertiesOf<QwikUiAriaAttributesKebab>();
  // return ariaAttributeKeys.includes(key as keyof QwikUiAriaAttributesKebab);
  return key.startsWith('aria') && key.indexOf('-') === -1;
}

export function isKeyOfQwikIntrinsicAriaAttributes(
  key: string
): key is keyof QwikIntrinsicAriaAttributes<string> {
  // const ariaAttributeKeys = propertiesOf<AriaAttributes>();
  // return ariaAttributeKeys.includes(key as keyof AriaAttributes);
  return key.startsWith('aria') && key.indexOf('-') > -1;
}
