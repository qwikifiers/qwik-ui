/* eslint-disable @typescript-eslint/no-explicit-any */
import { AriaAttributes } from '@builder.io/qwik';
// import { propertiesOf } from 'ts-reflection';

type ToCamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<ToCamelCase<Tail>>}`
  : S;

type KebabToCamelKeys<T> = {
  [K in keyof T as ToCamelCase<string & K>]: T[K];
};

type FromCamelCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${FromCamelCase<U>}`
    : `${Lowercase<T>}-${FromCamelCase<U>}`
  : Lowercase<S>;

type CamelToKebabKeys<T> = {
  [K in keyof T as FromCamelCase<string & K>]: T[K];
};

export type QwikUiAriaAttributesKebab = KebabToCamelKeys<AriaAttributes>;

export type ExtendedPropsByAriaAttribute<T = undefined> = T extends object
  ? T & QwikUiAriaAttributesKebab
  : T extends undefined
  ? QwikUiAriaAttributesKebab
  : never;

export type QwikUiAreaAttributesFunctionType = (
  ariaAttributes?: Partial<QwikUiAriaAttributesKebab>,
  lastKey?: string
) => { lastKey: string; ariaAttributes: Partial<AriaAttributes> };

export type QwikUiAreaAttributesFunctionReturnType =
  ReturnType<QwikUiAreaAttributesFunctionType>;

export function isKeyOfQwikUiAriaAttributes(
  key: string
): key is keyof QwikUiAriaAttributesKebab {
  // const ariaAttributeKeys = propertiesOf<QwikUiAriaAttributesKebab>();
  // return ariaAttributeKeys.includes(key as keyof QwikUiAriaAttributesKebab);
  return key.startsWith('aria') && key.indexOf('-') === -1;
}

export function isKeyOfAriaAttributes(
  key: string
): key is keyof AriaAttributes {
  // const ariaAttributeKeys = propertiesOf<AriaAttributes>();
  // return ariaAttributeKeys.includes(key as keyof AriaAttributes);
  return key.startsWith('aria') && key.indexOf('-') > -1;
}
