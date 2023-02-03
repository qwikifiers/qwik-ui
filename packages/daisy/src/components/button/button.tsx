import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Button as HeadlessButton } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export const daisyButtonConfig = {
  sizes: {
    sm: 'btn-sm',
    md: 'btn-md',
  },
};

// This type holds all the HTML attributes (disabled, hidden, ... )
export type HTMLButtonProps = QwikIntrinsicElements['button'];
export type DaisyButtonProps = { size?: 'sm' | 'md' };
export type ButtonProps = HTMLButtonProps & DaisyButtonProps;

export const Button = component$(
  ({ size = 'md', class: classNames, ...rest }: ButtonProps) => {
    const { sizes } = daisyButtonConfig;
    return (
      <HeadlessButton {...rest} class={clsq('btn', sizes[size], classNames)}>
        <Slot />
      </HeadlessButton>
    );
  }
);
