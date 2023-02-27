import { component$, HTMLAttributes, Slot } from '@builder.io/qwik';
import { Badge as HeadlessBadge } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type DaisyBadgeProps = {
  variant?: DaisyBadgeVariants;
  size?: DaisyBadgeSizes;
  outline?: boolean;
};

export type DaisyBadgeVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type DaisyBadgeSizes = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeProps = HTMLAttributes<HTMLElement> & DaisyBadgeProps;

export const Badge = component$((props: BadgeProps) => {
  const {
    size = 'md',
    variant = 'neutral',
    class: classNames,
    outline,
    ...rest
  } = props;

  const { variants, sizes, options } = {
    variants: {
      neutral: '',
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      ghost: 'badge-ghost',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
    sizes: {
      xs: 'badge-xs',
      sm: 'badge-sm',
      md: 'badge-md',
      lg: 'badge-lg',
    },
    options: {
      outline: 'badge-outline',
    },
  };

  return (
    <HeadlessBadge
      {...rest}
      class={clsq(
        'badge',
        variants[variant],
        sizes[size],
        {
          [options.outline]: outline,
        },
        classNames
      )}
    >
      <Slot />
    </HeadlessBadge>
  );
});
