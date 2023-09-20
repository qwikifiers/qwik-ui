import { Slot, component$ } from '@builder.io/qwik';
import { cva, stringifyClassList, type AddVariantPropsTo } from '@qwik-ui/cva';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md
  text-sm font-medium ring-offset-background transition-colors
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,

  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      look: {
        link: 'text-primary underline-offset-4 hover:underline',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      shape: {
        rounded: '',
        circular: '',
        square: '',
      },
      state: {
        enabled: '',
        active: '',
        disabled: '',
      },
      animation: {
        none: '',
        bouncy: 'transition duration-300 ease-in-out transform hover:scale-105',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      state: 'enabled',
      intent: 'primary',
      size: 'md',
      animation: 'none',
    },
    compoundVariants: [
      {
        // intent: 'primary',
        // look: 'outline',
        // state: 'enabled',
        // class: 'hover:bg-primary/90 hover:text-primary-foreground',
      },
    ],
  },
);

export type ButtonProps = AddVariantPropsTo<'button', typeof buttonVariants>;

export const Button = component$<ButtonProps>(
  ({ intent, size, class: classList, ...restOfProps }) => {
    const finalClassList = buttonVariants({ intent, size, class: classList });
    return (
      <button class={twMerge(stringifyClassList(finalClassList))} {...restOfProps}>
        <Slot />
      </button>
    );
  },
);
