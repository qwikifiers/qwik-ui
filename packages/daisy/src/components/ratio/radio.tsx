import { component$, QwikIntrinsicElements } from '@builder.io/qwik';
import { Radio as HeadlessRadio } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type HTMLRadioProps = QwikIntrinsicElements['progress'];

export type DaisyRadioProps = {
  variant?: DaisyRadioVariants;
  name?: string;
  value?: string[];
};

export type DaisyRadioVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type RadioProps = HTMLRadioProps & DaisyRadioProps;

export const Radio = component$((props: RadioProps) => {
  const {
    variant = 'primary',
    class: classNames,
    value = ['first', 'second'],
    name = 'radio-1',
  } = props;

  const { variants } = daisyConfig;

  return (
    <>
      {value.map((e) => {
        return (
          <HeadlessRadio
            type="radio"
            name={name}
            class={clsq('radio mx-1', variants[variant], classNames)}
            checked
            value={e}
          />
        );
      })}
    </>
  );
});
