import {
  component$,
  PropFunction,
  QwikIntrinsicElements,
  QwikChangeEvent,
} from '@builder.io/qwik';
import { Radio as HeadlessRadio } from '@qwik-ui/primitives';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type HTMLRadioProps = QwikIntrinsicElements['input'];

export type TailwindRadioProps = {
  variant?: TailwindRadioVariants;
  name?: string;
  value?: string;
  onChange$?: PropFunction<(evt: QwikChangeEvent<HTMLInputElement>) => void>;
};

export type TailwindRadioVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type RadioProps = HTMLRadioProps & TailwindRadioProps;

export const Radio = component$((props: RadioProps) => {
  const {
    variant = 'primary',
    class: classNames,
    value = 'first',
    name = 'radio-1',
    ...rest
  } = props;

  const { variants } = daisyConfig;

  return (
    <HeadlessRadio
      {...rest}
      type="radio"
      name={name}
      class={clsq('radio mx-1', variants[variant], classNames)}
      value={value}
    ></HeadlessRadio>
  );
});
