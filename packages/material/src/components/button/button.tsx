import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type HTMLButtonProps = QwikIntrinsicElements['button'];

export type MaterialButtonProps = {
  disabled?: boolean;
  floating?: boolean;
  flat?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export type ButtonProps = HTMLButtonProps & MaterialButtonProps;

export const Button = component$((props: ButtonProps) => {
  const {
    class: className,
    disabled,
    floating,
    flat,
    size = 'medium',
    ...rest
  } = props;

  return (
    <HeadlessButton
      {...rest}
      class={clsq(
        {
          disabled: disabled,
          'btn-floating': floating,
          'btn-flat': flat,
          // size
          'btn-small': size === 'small',
          btn: size === 'medium',
          'btn-large': size === 'large',
        },
        className
      )}
    >
      <Slot />
    </HeadlessButton>
  );
});
