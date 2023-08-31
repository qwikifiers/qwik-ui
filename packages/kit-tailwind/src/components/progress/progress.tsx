import { component$, QwikIntrinsicElements } from '@builder.io/qwik';
import { Progress as HeadlessProgress } from '@qwik-ui/primitives';
import { clsq } from '@qwik-ui/shared';
import { daisyConfig } from './daisy.config';

export type HTMLProgressProps = QwikIntrinsicElements['progress'];

export type TailwindProgressProps = {
  variant?: TailwindProgressVariants;
  value?: number;
  max?: number;
};

export type TailwindProgressVariants =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ProgressProps = HTMLProgressProps & TailwindProgressProps;

export const Progress = component$((props: ProgressProps) => {
  const { variant = 'primary', class: classNames, value = 0, max = 100, ...rest } = props;

  const { variants } = daisyConfig;

  return (
    <HeadlessProgress
      {...rest}
      value={value}
      max={max}
      class={clsq('progress', variants[variant], classNames)}
    ></HeadlessProgress>
  );
});
