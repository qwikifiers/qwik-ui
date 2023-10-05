import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { stringifyClassList } from '@qwik-ui/cva';
import type { OmitSignalClass } from '@qwik-ui/type-utils';
import { twMerge } from 'tailwind-merge';

export type InputProps = OmitSignalClass<
  Omit<QwikIntrinsicElements['input'], 'children'>
>;

export const Input = component$<InputProps>(
  ({ class: classList, type, ...restOfProps }) => {
    const inputClasses = [
      `flex h-10 w-full rounded-md border border-input 
      bg-background px-3 py-2 text-sm ring-offset-background 
      file:border-0 file:bg-transparent file:text-sm 
      file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50`,
      classList,
    ];
    const twOptimizedClassesString = twMerge(stringifyClassList(inputClasses));

    return <input {...restOfProps} type={type} class={twOptimizedClassesString} />;
  },
);
