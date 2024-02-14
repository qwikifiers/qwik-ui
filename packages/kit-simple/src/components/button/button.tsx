import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium rounded-base qwik-ui-animation disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1',
  {
    variants: {
      color: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/80',
        alert:
          'bg-alert text-alert-foreground hover:bg-alert/90 focus-visible:ring-alert/80',
      },
      look: {
        solid: 'shadow focus-visible:ring-offset-1',
        outline: 'bg-background border hover:bg-accent',
        ghost: 'bg-transparent text-accent-foreground hover:bg-accent',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline hover:bg-transparent',
      },
      size: {
        xs: 'px-2 py-1.5 text-xs',
        sm: 'px-2.5 py-2 text-sm',
        md: 'px-4 py-3',
        lg: ' px-8 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
      look: 'solid',
    },
    compoundVariants: [
      {
        look: 'outline',
        color: 'primary',
        class: 'text-primary',
      },
      {
        look: 'outline',
        color: 'secondary',
        class: 'text-secondary',
      },
      {
        look: 'outline',
        color: 'alert',
        class: 'text-alert',
      },
    ],
  },
);

type ButtonProps = PropsOf<'button'> & VariantProps<typeof buttonVariants>;

const Button = component$<ButtonProps>(({ color, size, look, ...props }) => {
  return (
    <button {...props} class={cn(buttonVariants({ color, size, look }), props.class)}>
      <Slot />
    </button>
  );
});

export { Button, buttonVariants };
