import { ClassList } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { cva } from './cva';
import { stringifyClassList } from './stringify-classlist';
import { Config, Props } from './types';

export function tcva<T>(base?: ClassList, config?: Config<T>) {
  const variantsFn = cva(base, config);

  return function wrappedVariantsFn(props: Props<T>): string {
    return twMerge(stringifyClassList(variantsFn(props)));
  };
}
