import {
  PropFunction,
  QwikChangeEvent,
  QwikIntrinsicElements,
  component$,
} from '@builder.io/qwik';
import { Radio as HeadlessRadio } from '@qwik-ui/primitives';
import type { OmitSignalClass } from '@qwik-ui/utils';
import { daisyConfig } from './daisy.config';

export type HTMLRadioProps = OmitSignalClass<QwikIntrinsicElements['input']>;

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
    /* @ts-expect-error ignore because deprecated */
    <HeadlessRadio
      {...rest}
      type="radio"
      name={name}
      class={['radio mx-1', variants[variant], classNames]}
      value={value}
    ></HeadlessRadio>
  );
});
