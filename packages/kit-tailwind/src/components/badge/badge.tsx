import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type TailwindBadgeProps = QwikIntrinsicElements['div'] & {
  variant?: TailwindBadgeVariants;
  size?: TailwindBadgeSizes;
  outline?: boolean;
};

export type TailwindBadgeVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type TailwindBadgeSizes = 'xs' | 'sm' | 'md' | 'lg';

export const Badge = component$((props: TailwindBadgeProps) => {
  const { size = 'md', variant = 'neutral', class: classNames, outline, ...rest } = props;

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
    <div
      {...rest}
      class={[
        'badge',
        variants[variant],
        sizes[size],
        outline ? options.outline : '',
        `${classNames}`,
      ]}
    >
      <Slot />
    </div>
  );
});
