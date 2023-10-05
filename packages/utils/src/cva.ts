// Adapted from https://github.com/joe-bell/cva/blob/main/packages/class-variance-authority/src/index.ts
// The code of this file is licensed under the apache 2 license found in https://github.com/joe-bell/cva/blob/main/LICENSE
// These are the changes made to the original code:
// - removed clsx dep
// - removed className prop
// - use Qwik ClassList instead of ClassValue
// - simplified VariantProps + expand props in hover tooltip
// - added VariantPropsFor type

import { type ClassList } from '@builder.io/qwik';
import { Config, Props } from './types';

const falsyToString = <T>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const cva =
  <T>(base?: ClassList, config?: Config<T>): ((props: Props<T>) => ClassList) =>
  (props?: Props<T>) => {
    if (!config?.variants) return [base, props?.class];

    const { variants, defaultVariants } = config;

    const getVariantClassNames = Object.keys(variants).map(
      (variant: keyof typeof variants) => {
        const variantProp = props?.[variant as keyof typeof props];
        const defaultVariantProp = defaultVariants?.[variant];

        if (variantProp === null) return null;

        const variantKey = (falsyToString(variantProp) ||
          falsyToString(defaultVariantProp)) as keyof (typeof variants)[typeof variant];

        return variants[variant][variantKey];
      },
    );

    let getCompoundVariantClassNames;
    if (config?.compoundVariants) {
      const combinedProps = props
        ? Object.entries(props).reduce(
            (acc, [key, value]) => {
              if (value === undefined) {
                return acc;
              }

              acc[key] = value;
              return acc;
            },
            { ...defaultVariants } as Record<string, unknown>,
          )
        : defaultVariants;
      // console.log('combinedProps', combinedProps);
      getCompoundVariantClassNames =
        combinedProps &&
        config.compoundVariants.reduce(
          (acc, { class: cvClass, ...compoundVariantOptions }) =>
            Object.entries(compoundVariantOptions).every(([key, value]) => {
              const propVal = combinedProps[key];
              return Array.isArray(value) ? value.includes(propVal) : propVal === value;
            })
              ? [...acc, cvClass]
              : acc,
          [] as ClassList[],
        );
    }

    return [base, getVariantClassNames, getCompoundVariantClassNames, props?.class];
  };
