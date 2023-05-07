import { component$, PropFunction } from '@builder.io/qwik';
import {
  Slider as HeadlessSlider,
  SliderProgress as HeadlessSliderProgress,
  SliderThumb as HeadlessSliderThumb,
} from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type SliderProps = {
  variant?: TailwindSliderVariants;
  value: number;
  min: number;
  max: number;
  onChange$?: PropFunction<(value: number) => void>;
  class?: string;
  style?: string;
};

export type TailwindSliderVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error';

export const Slider = component$(
  ({
    variant = 'primary',
    class: classNames,
    value = 0,
    style,
    onChange$,
    ...rest
  }: SliderProps) => {
    const { variants } = daisyConfig;

    return (
      <HeadlessSlider
        {...rest}
        style={`
        height: 1.5em;
        background-color: transparent;
        border: none;
        ${style ?? ''}
      `}
        class={clsq('mx-4', classNames)}
        value={value}
        onChange$={(value) => onChange$?.(value)}
      >
        <HeadlessSliderProgress
          style={`
          background-color: hsl(var(${variants[variant]}));
          height: 1.5em;
          border-radius: 1.5em 0 0 1.5em;
        `}
        />
        <HeadlessSliderThumb
          style={`
          border: 3px solid hsl(var(${variants[variant]}));
          height: 1.5em;
          width: 1.5em;
          background-color: hsl(var(--b1));
        `}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '0',
            right: '0',
            height: '33%',
            zIndex: -1,
            borderRadius: '1.5em',
            backgroundColor: 'hsl(var(--b1))',
          }}
        />
      </HeadlessSlider>
    );
  }
);
