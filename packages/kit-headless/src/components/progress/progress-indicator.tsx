import { PropsOf, component$, useComputed$, useContext } from '@builder.io/qwik';
import { ProgressContext } from './progress-context';

type ProgressIndicatorElement = PropsOf<'div'>;
export const ProgressIndicator = component$<ProgressIndicatorElement>((props) => {
  const { ...indicatorProps } = props;

  const context = useContext(ProgressContext);

  const translateXSig = useComputed$(() => {
    if (context.valueSig.value === null) return 'translateX(-100%)';
    const range = context.maxSig.value - context.minSig.value;
    const progress = (context.valueSig.value - context.minSig.value) / range;
    return `translateX(-${100 - progress * 100}%)`;
  });

  return (
    <div
      style={{ transform: translateXSig.value }}
      title="progress_indicator"
      {...context.dataAttributesSig.value}
      {...indicatorProps}
    />
  );
});
