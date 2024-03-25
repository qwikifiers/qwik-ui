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
  max?: number;
  value?: number;
  getValueLabel?(value: number, max: number): string;
};

type ProgressElement = PropsOf<'div'>;
const DEFAULT_MAX = 100;

export const Root = component$<ProgressProps & ProgressElement>((props) => {
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
      data-state={getProgressState(value, max)}
      data-value={value ?? undefined}
      data-max={max}
      {...progressProps}
    >
      <Slot />
    </div>
  );
});
