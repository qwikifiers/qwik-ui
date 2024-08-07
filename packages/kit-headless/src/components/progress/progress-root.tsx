import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useTask$,
} from '@builder.io/qwik';
import { ProgressContext } from './progress-context';

type ProgressProps = {
  min?: number;

  /** Maximum value of the progress bar.**/
  max?: number;

  /** Current value of the progress bar. **/
  value?: number;

  ['bind:value']?: Signal<number>;

  /** Callback to get the label for the current value. **/
  getValueLabel?(value: number, max: number): string;
};

export type ProgressState = 'indeterminate' | 'complete' | 'loading';
export const ProgressRoot = component$<ProgressProps & PropsOf<'div'>>((props) => {
  /** Default max value for progress bar **/
  const defaultMax = 100;

  const minSig = useComputed$(() => props.min ?? 0);
  const maxSig = useComputed$(() => props.max ?? defaultMax);
  const valueSig = useComputed$(() => props.value ?? null);
  const isValidProgressSig = useComputed$(() => {
    return Number.isFinite(maxSig.value) && maxSig.value > minSig.value;
  });

  const valueLabelSig = useComputed$(() => {
    const value = valueSig.value ?? 0;
    if (props.getValueLabel) {
      return props.getValueLabel(value, maxSig.value);
    }
    return `${Math.round((value / maxSig.value) * 100)}%`;
  });

  useTask$(function checkValidProgress({ track }) {
    track(() => isValidProgressSig.value);
    if (!isValidProgressSig.value) {
      throw new Error(
        'Qwik UI: Progress component max must be a finite number and greater than min.',
      );
    }
  });

  const progressSig = useComputed$(() => {
    return valueSig.value == null
      ? 'indeterminate'
      : valueSig.value === maxSig.value
        ? 'complete'
        : 'loading';
  });

  const dataAttributesSig = useComputed$(() => {
    return {
      'data-progress': progressSig.value,
      'data-value': valueSig.value ?? undefined,
      'data-max': maxSig.value,
    };
  });

  const context: ProgressContext = {
    dataAttributesSig,
    valueSig,
    maxSig,
  };

  useContextProvider(ProgressContext, context);

  return (
    <div
      role="progressbar"
      aria-label="progress"
      aria-valuemax={maxSig.value}
      aria-valuemin={minSig.value}
      data-min={minSig.value}
      aria-valuenow={valueSig.value ?? undefined}
      aria-valuetext={valueLabelSig.value}
      {...dataAttributesSig.value}
      {...props}
    >
      <Slot />
    </div>
  );
});
