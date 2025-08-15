import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden',
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

type BadgeProps = PropsOf<'div'> & VariantProps<typeof badgeVariants>;

export const Badge = component$<BadgeProps>(({ look, ...props }) => {
  return (
    <div {...props} class={cn(badgeVariants({ look }), props.class)}>
      <Slot />
    </div>
  );
});
