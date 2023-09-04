import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import type { OmitSignalClass } from '@qwik-ui/type-utils';
import { daisyConfig } from './daisy.config';

export type HTMLButtonProps = OmitSignalClass<QwikIntrinsicElements['button']>;

export type TailwindButtonProps = {
  variant?: TailwindButtonVariants;
  size?: TailwindButtonSizes;
  active?: boolean;
  noAnimation?: boolean;
  circle?: boolean;
  glass?: boolean;
  loading?: boolean;
  outline?: boolean;
  square?: boolean;
};

export type TailwindButtonVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link'
  | 'disabled';
export type TailwindButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'block' | 'wide';
export type ButtonProps = HTMLButtonProps & TailwindButtonProps;

export const Button = component$((props: ButtonProps) => {
  const {
    size = 'md',
    variant = 'primary',
    circle,
    active,
    class: classNames,
    disabled,
    glass,
    loading,
    noAnimation,
    outline,
    square,
    ...rest
  } = props;

  const { variants, sizes, options } = daisyConfig;

  return (
    <button
      {...rest}
      class={[
        'btn',
        variants[variant],
        sizes[size],
        {
          [options.active]: active,
          [options.outline]: outline,
          [options.disabled]: disabled,
          [options.glass]: glass,
          [options.loading]: loading,
          [options.noAnimation]: noAnimation,
          [options.circle]: circle,
          [options.square]: square,
        },
        classNames,
      ]}
    >
      <Slot />
    </button>
  );
});
