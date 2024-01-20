import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    'animation',
  ],
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        warning: '',
        success: '',
        danger: '',
      },
      variant: {
        solid: '',
        subtle: '',
        outline:
          'border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
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
        class: 'bg-primary text-primary-foregorund hover:bg-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        class: 'bg-secondary text-secondary-foregorund hover:bg-secondary/90',
      },
      {
        variant: 'solid',
        color: 'danger',
        class: 'bg-destructive text-destructive-foregorund hover:bg-destructive/90',
      },
      {
        variant: 'outline',
        color: 'primary',
        class: 'text-primary hover:text-primary-foreground border-primary',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class: 'text-secondary hover:text-secondary-foreground border-secondary',
      },
      {
        variant: 'outline',
        color: 'danger',
        class: 'text-destructive hover:text-destructive-foreground border-destructive',
      },
    ],
  },
);

type ButtonProps = QwikIntrinsicElements['button'] & VariantProps<typeof buttonVariants>;

const Button = component$<ButtonProps>(({ variant, size, ...props }) => {
  return (
    <button {...props} class={cn(buttonVariants({ variant, size }), props.class)}>
      <Slot />
    </button>
  );
});

export { Button, buttonVariants };
