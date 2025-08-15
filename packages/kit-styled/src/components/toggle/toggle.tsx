import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as HeadlessToggle } from '@qwik-ui/headless';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-primary aria-pressed:text-primary-foreground',
  {
    variants: {
      look: {
        default: 'border border-input bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },

      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      look: 'default',
      size: 'default',
    },
  },
);

type ToggleProps = PropsOf<typeof HeadlessToggle> & VariantProps<typeof toggleVariants>;

export const Toggle = component$<ToggleProps>(({ size, look, ...props }) => {
  return (
    <HeadlessToggle {...props} class={cn(toggleVariants({ size, look }), props.class)}>
      <Slot />
    </HeadlessToggle>
  );
});
