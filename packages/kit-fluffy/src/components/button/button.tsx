import { tcva, type AddVariantPropsTo } from '@qwik-ui/utils';
import { Slot, component$ } from '@builder.io/qwik';

export const buttonVariants = tcva(
  `inline-flex items-center justify-center
  text-sm font-medium ring-offset-background transition-colors
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      intent: {
        basic: `text-foreground font-semibold py-2 px-4 border border-gray-300 
           rounded hover:bg-accent hover:text-accent-foreground`,
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      look: {
        link: `border-transparent bg-transparent text-foreground 
               hover:underline hover:bg-transparent shadow-none outline-current`,
        ghost:
          'border-transparent bg-transparent border hover:bg-accent hover:text-accent-foreground',
        outline: 'bg-transparent border  hover:bg-accent  hover:text-accent-foreground',
      },
      shape: {
        rounded: 'rounded',
        circular: 'w-20 h-20 rounded-full',
        square: 'w-20 h-20',
      },
      state: {
        enabled: '',
        active: 'bg-primary/90 text-white font-semibold py-2 px-4',
        disabled:
          'bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded pointer-events-none cursor-not-allowed',
      },
      animation: {
        none: '',
        bouncy: 'transition active:scale-90',
      },
      size: {
        sm: 'h-8 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 rounded-md px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      state: 'enabled',
      intent: 'primary',
      shape: 'rounded',
      size: 'md',
      animation: 'bouncy',
    },
    compoundVariants: [
      {
        intent: 'primary',
        look: ['outline', 'ghost'],
        class: 'text-primary hover:text-primary dark:filter dark:brightness-200',
      },
      {
        intent: 'secondary',
        look: ['outline', 'ghost'],
        class: 'text-secondary hover:text-secondary dark:filter dark:brightness-200',
      },
      {
        intent: 'danger',
        look: ['outline', 'ghost'],
        class: 'text-destructive hover:text-destructive dark:filter dark:brightness-200',
      },
      {
        intent: 'primary',
        look: ['outline'],
        class: 'border-primary',
      },
      {
        intent: 'secondary',
        look: ['outline'],
        class: 'border-secondary',
      },
      {
        intent: 'danger',
        look: ['outline'],
        class: 'border-destructive',
      },
      {
        intent: 'basic',
        look: ['outline'],
        class: 'border-foreground',
      },
    ],
  },
);

export type ButtonProps = AddVariantPropsTo<'button', typeof buttonVariants>;

/*
  TODO: FIX COMPLEX TYPES HERE. They have changed as of 1.3, preventing the preview
*/
export const Button = component$<ButtonProps>(
  ({ intent, size, look, shape, state, animation, class: classList, ...restOfProps }) => {
    const twOptimizedClassesString = buttonVariants({
      intent,
      size,
      look,
      shape,
      state,
      animation,
      class: classList,
    });

    return (
      // @ts-expect-error complex types here, need to change
      <button class={twOptimizedClassesString} {...restOfProps}>
        <Slot />
      </button>
    );
  },
);

export default Button;
