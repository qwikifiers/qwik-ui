/* eslint-disable @typescript-eslint/no-explicit-any */
import { AriaAttributes } from '@builder.io/qwik';
import { propertiesOf } from 'ts-reflection';

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

type AA = {
  ariaAttributes?: QwikUiAriaAttributesKebab;
};

export type QwikUiAriaAttributesKebab = KebabToCamelKeys<AriaAttributes>;

export type ExtendedPropsByAriaAttribute<T = undefined> = T extends object
  ? T & AA
  : T extends undefined
  ? AA
  : never;

export function isKeyOfQwikUiAriaAttributes(
  key: string
): key is keyof QwikUiAriaAttributesKebab {
  const ariaAttributeKeys = propertiesOf<QwikUiAriaAttributesKebab>();
  return ariaAttributeKeys.includes(key as keyof QwikUiAriaAttributesKebab);
}

export function isKeyOfAriaAttributes(
  key: string
): key is keyof AriaAttributes {
  const ariaAttributeKeys = propertiesOf<AriaAttributes>();
  return ariaAttributeKeys.includes(key as keyof AriaAttributes);
}
