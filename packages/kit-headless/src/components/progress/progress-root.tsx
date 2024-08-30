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
import { useBoundSignal } from '../../utils/bound-signal';

type ProgressProps = {
  min?: number;

  /** Maximum value of the progress bar.**/
  max?: number;

  /** Current value of the progress bar. **/
  value?: number | null;

  ['bind:value']?: Signal<number | null>;

  /** Callback to get the label for the current value. **/
  getValueLabel?(value: number, max: number): string;
};

export type ProgressState = 'indeterminate' | 'complete' | 'loading';
export const ProgressRoot = component$<ProgressProps & PropsOf<'div'>>((props) => {
  const { 'bind:value': givenValueSig, ...rest } = props;

  /** Default max value for progress bar **/
  const defaultMax = 100;

  const minSig = useComputed$(() => props.min ?? 0);
  const maxSig = useComputed$(() => props.max ?? defaultMax);
  const valueSig = useBoundSignal(givenValueSig, props.value ?? null);

  // to support when value prop is changed for backwards compatibility
  useTask$(({ track }) => {
    if (props.value === undefined) return;
    track(() => props.value);
    valueSig.value = props.value;
  });

  const isValidProgressSig = useComputed$(() => {
    const isMaxFinite = Number.isFinite(maxSig.value);
    const isMaxGreaterThanMin = maxSig.value > minSig.value;
    const isValueValid = valueSig.value === null || valueSig.value >= minSig.value;

    return isMaxFinite && isMaxGreaterThanMin && isValueValid;
  });

  const valueLabelSig = useComputed$(() => {
    const value = valueSig.value ?? minSig.value;
    const range = maxSig.value - minSig.value;
    if (props.getValueLabel) {
      return props.getValueLabel(value, maxSig.value);
    }
    return `${Math.round(((value - minSig.value) / range) * 100)}%`;
  });

  useTask$(function checkValidProgress({ track }) {
    track(() => isValidProgressSig.value);
    if (!isValidProgressSig.value) {
      throw new Error(
        'Qwik UI: Progress component must be a finite number, and within the max and min range.',
      );
    }
  });

  const progressSig = useComputed$(() => {
    if (valueSig.value == null) return 'indeterminate';
    const range = maxSig.value - minSig.value;
    const progress = (valueSig.value - minSig.value) / range;
    return progress >= 1 ? 'complete' : 'loading';
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
    minSig,
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
      {...rest}
    >
      <Slot />
    </div>
  );
});
