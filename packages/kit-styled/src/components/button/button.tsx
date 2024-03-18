import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// TODO: Create a RFC of the variants and explaining the thought process behind them

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium rounded disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
  {
    variants: {
      look: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-100 active:press active:shadow-base border-base',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm transition-all duration-100 active:press active:shadow-base border-base',
        alert:
          'bg-alert text-alert-foreground hover:bg-alert/90 shadow-sm transition-all duration-100 active:press active:shadow-base border-base',
        outline:
          'shadow-sm transition-all duration-100 active:press active:shadow-base bg-background text-foreground border hover:bg-accent',
        ghost: 'text-accent-foreground hover:bg-accent',
        link: 'text-foreground hover:underline hover:underline-offset-2 hover:text-foreground/80 hover:bg-transparent',
      },
      size: {
        sm: 'px-2 h-8 py-1.5 text-sm',
        md: 'px-4 h-12 py-3 text-base',
        lg: ' px-8 h-16 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      look: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = PropsOf<'button'> & VariantProps<typeof buttonVariants>;

export const Button = component$<ButtonProps>(({ size, look, ...props }) => {
  return (
    <button {...props} class={cn(buttonVariants({ size, look }), props.class)}>
      <Slot />
    </button>
  );
});
