import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-preset text-sm font-medium transition active:scale-90 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      color: {
        primary:
          'focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-primary/80',
        secondary:
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/80',

        warning:
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warning/80',

        alert:
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-alert/80',

        success:
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-success/80',
      },
      variant: {
        solid: 'shadow focus-visible:ring-offset-1',
        subtle: '',
        outline: 'border bg-transparent shadow',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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
      variant: 'solid',
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        class: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        class: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      },
      {
        variant: 'solid',
        color: 'warning',
        class: 'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      {
        variant: 'solid',
        color: 'alert',
        class: 'bg-alert text-alert-foreground hover:bg-alert/90',
      },
      {
        variant: 'solid',
        color: 'success',
        class: 'bg-success text-success-foreground hover:bg-success/90',
      },
      {
        variant: 'outline',
        color: 'primary',
        class: 'bg-background text-primary hover:bg-primary/10 border-primary',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class:
          'bg-background text-secondary hover:text-secondary-foreground border-secondary',
      },
      {
        variant: 'outline',
        color: 'warning',
        class: 'bg-background text-warning hover:text-warning-foreground border-warning',
      },
      {
        variant: 'outline',
        color: 'alert',
        class: 'bg-background text-alert hover:text-alert-foreground border-alert',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'bg-background text-success hover:text-success-foreground border-success',
      },
    ],
  },
);

type ButtonProps = PropsOf<'button'> & VariantProps<typeof buttonVariants>;

const Button = component$<ButtonProps>(({ color, size, variant, ...props }) => {
  return (
    <button {...props} class={cn(buttonVariants({ color, size, variant }), props.class)}>
      <Slot />
    </button>
  );
});

export { Button, buttonVariants };
