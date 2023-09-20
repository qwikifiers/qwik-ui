// Adapted from https://github.com/joe-bell/cva/blob/main/packages/class-variance-authority/src/index.ts
// - removed clsx dep
// - removed className prop
// - use Qwik ClassList instead of ClassValue
// - simplified VariantProps + expand props in hover tooltip
// - added VariantPropsFor type

import { type ClassList, type QwikIntrinsicElements } from '@builder.io/qwik';

/** All the props that the variant function adds, including a `class` */
export type VariantProps<VariantFn> = VariantFn extends (p: infer Props) => ClassList
  ? // Expand the props so they are visible in hover tooltips
    { [p in keyof Props]: Props[p] }
  : never;
/** The DOM props of the given element + the variant props */
export type AddVariantPropsTo<El extends keyof QwikIntrinsicElements, VariantFn> = Omit<
  QwikIntrinsicElements[El],
  'class'
> &
  VariantProps<VariantFn>;

type ClassProp = { class?: ClassList };
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

const falsyToString = <T>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

type ConfigSchema = {
  [configOption: string]: { [variant: string]: ClassList };
};
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

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
