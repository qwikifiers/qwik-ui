import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type HTMLButtonProps = QwikIntrinsicElements['button'];

export type MaterialButtonProps = {
  disabled?: boolean;
  floating?: boolean;
  flat?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export type ButtonProps = HTMLButtonProps & MaterialButtonProps;

export const Button = component$((props: ButtonProps) => {
  const { disabled, floating, flat, size = 'medium', ...rest } = props;

  return (
    <button
      {...rest}
      class={[
        {
          disabled: disabled,
          'btn-floating': floating,
          'btn-flat': flat,
          // size
          'btn-small': size === 'small',
          btn: size === 'medium',
          'btn-large': size === 'large',
        },
      ]}
    >
      <Slot />
    </button>
  );
});
