import { type ClassList, type QwikIntrinsicElements } from '@builder.io/qwik';

export type ClassProp = { class?: ClassList };
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

/** All the props that the variant function adds, including a `class` */
export type VariantProps<VariantFn> = VariantFn extends (p: infer Props) => ClassList
  ? // Expand the props so they are visible in hover tooltips
    { [p in keyof Props]: Props[p] }
  : never;
/** The DOM props of the given element + the variant props */
export type AddVariantPropsTo<
  El extends keyof QwikIntrinsicElements,
  VariantFn,
> = OmitSignalClass<QwikIntrinsicElements[El]> & VariantProps<VariantFn>;

export type ConfigSchema = {
  [configOption: string]: { [variant: string]: ClassList };
};
export type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
export type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

export type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;

export type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

export type OmitSignalClass<T> = Omit<T, 'class'> & { class?: ClassList };
