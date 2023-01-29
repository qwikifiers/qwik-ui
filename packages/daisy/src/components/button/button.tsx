import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type HTMLButtonProps = QwikIntrinsicElements['button'];

export type DaisyButtonProps = {
  noAnimation?: boolean;
  glass?: boolean;
  loading?: boolean;
  circle?: boolean;
  square?: boolean;
  active?: boolean;
  disabled?: boolean;
  outline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'block' | 'wide';
} & DaisyButtonModifiers;

export type DaisyButtonModifiers = {
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  ghost?: boolean;
  link?: boolean;
}

export type ButtonProps = HTMLButtonProps & DaisyButtonProps ;

export const Button = component$(
  (props: ButtonProps) => {
    const {
      class: cls,
      primary, secondary, accent, info, success, warning, error, ghost, link, outline, active, disabled, glass, loading, noAnimation,
      circle,
      square,
      size = 'md',
      ...rest } = props;

    return (
      <HeadlessButton
        {...rest}
        class={
          clsq(
            'btn',
            {
              // modifiers
              'btn-primary': primary,
              'btn-secondary': secondary,
              'btn-accent': accent,
              'btn-info': info,
              'btn-success': success,
              'btn-warning': warning,
              'btn-error': error,
              'btn-ghost': ghost,
              'btn-link': link,
              'btn-active': active,
              // daisy props
              'btn-outline': outline,
              'btn-disabled': disabled,
              'glass': glass,
              'loading': loading,
              'no-animation': noAnimation,
              'btn-circle': circle,
              'btn-square': square,
              // size
              'btn-xs': size === 'xs',
              'btn-sm': size === 'sm',
              'btn-md': size === 'md',
              'btn-lg': size === 'lg',
            },
            cls
          )}
      >
        <Slot />
      </HeadlessButton>
    );
  }
);
