import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type HTMLButtonProps = QwikIntrinsicElements['button'];

export type DaisyButtonProps = {
  variant?: DaisyButtonVariants
  size?: DaisyButtonSizes
  active?: boolean;
  noAnimation?: boolean;
  circle?: boolean;
  glass?: boolean;
  loading?: boolean;
  outline?: boolean;
  square?: boolean;
}

export type DaisyButtonVariants = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'link' | 'disabled';
export type DaisyButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'block' | 'wide';
export type ButtonProps = HTMLButtonProps & DaisyButtonProps ;

export const Button = component$(
  (props: ButtonProps) => {
    const {
      size = 'md',
      variant = 'primary',
      circle,
      active,
      class: className,
      disabled,
      glass,
      loading,
      noAnimation,
      outline,
      square,
      ...rest
    } = props;

    const {
      variants,
      sizes,
      options
    } = daisyConfig

    return (
      <HeadlessButton
        {...rest}
        class={
          clsq(
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
            className
          )}
      >
        <Slot />
      </HeadlessButton>
    );
  }
);
