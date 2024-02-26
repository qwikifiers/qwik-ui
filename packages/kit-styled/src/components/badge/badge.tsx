import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      look: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        alert: 'bg-alert text-alert-foreground hover:bg-alert/80',
        outline: 'border text-foreground',
      },
    },
    defaultVariants: {
      look: 'primary',
    },
  },
);

export type BadgeProps = PropsOf<'div'> & VariantProps<typeof badgeVariants>;

const Badge = component$<BadgeProps>(({ look, ...props }) => {
  return (
    <div {...props} class={cn(badgeVariants({ look }), props.class)}>
      <Slot />
    </div>
  );
});

export { Badge, badgeVariants };
