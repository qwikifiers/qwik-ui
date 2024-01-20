import { PropsOf, component$ } from '@builder.io/qwik';
import { Toggle as HeadlessToggle } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { VariantProps, cva } from 'class-variance-authority';

type ToggleProps = PropsOf<typeof HeadlessToggle> & VariantProps<typeof toggleVariants>;

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = component$<ToggleProps>(({ variant, size, ...props }) => (
  <HeadlessToggle {...props} class={cn(toggleVariants({ variant, size }), props.class)} />
));

export { Toggle, toggleVariants };
