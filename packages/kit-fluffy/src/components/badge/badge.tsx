import { Slot, component$ } from '@builder.io/qwik';
import { tcva, type AddVariantPropsTo } from '@qwik-ui/utils';

export const badgeVariants = tcva(
  `inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold 
  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
  {
    variants: {
      intent: {
        primary:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      look: {
        outline: 'text-foreground',
      },
      shape: {
        rounded: 'rounded',
        circular: 'rounded-full',
        square: '',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      shape: 'circular',
      size: 'md',
    },
  },
);

export type BadgeProps = AddVariantPropsTo<'div', typeof badgeVariants>;

export const Badge = component$<BadgeProps>(
  ({ intent, size, look, shape, class: classList, ...restOfProps }) => {
    const twOptimizedClassesString = badgeVariants({
      intent,
      size,
      look,
      shape,
      class: classList,
    });

    return (
      <div class={twOptimizedClassesString} {...restOfProps}>
        <Slot />
      </div>
    );
  },
);

export default Badge;
