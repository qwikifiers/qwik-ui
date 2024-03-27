import { PropsOf, Slot, component$, useContextProvider } from '@builder.io/qwik';
import {
  defaultGetValueLabel,
  getProgressState,
  isNumber,
  isValidMaxNumber,
  isValidValueNumber,
} from './util';
import { ProgressContext } from './progress-context';

type ProgressProps = {
  /** Maximum value of the progress bar.**/
  max?: number;

  /** Current value of the progress bar. **/
  value?: number;

  /** Callback to get the label for the current value. **/
  getValueLabel?(value: number, max: number): string;
};

type ProgressElement = PropsOf<'div'>;

/** Default max value for progress bar **/
const DEFAULT_MAX = 100;

export const Progress = component$<ProgressProps & ProgressElement>((props) => {
  const {
    max: mapProp,
    value: valueProp,
    getValueLabel = defaultGetValueLabel,
    ...progressProps
  } = props;

  const max = isValidMaxNumber(mapProp) ? mapProp : DEFAULT_MAX;
  const value = isValidValueNumber(valueProp, max) ? valueProp : null;
  const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined;

  useContextProvider(ProgressContext, { value: value, max: max });

  return (
    <div
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={isNumber(value) ? value : undefined}
      aria-valuetext={valueLabel}
      role="progressbar"
      title="progress-bar"
      data-progress={getProgressState(value, max)}
      data-value={value ?? undefined}
      data-max={max}
      {...progressProps}
    >
      <Slot />
    </div>
  );
});
