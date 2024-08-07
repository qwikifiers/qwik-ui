import { PropsOf, component$, useComputed$, useContext } from '@builder.io/qwik';
import { ProgressContext } from './progress-context';

type ProgressIndicatorElement = PropsOf<'div'>;
export const ProgressIndicator = component$<ProgressIndicatorElement>((props) => {
  const { ...indicatorProps } = props;

  const context = useContext(ProgressContext);

  const translateXSig = useComputed$(() =>
    context.valueSig.value ? `translateX(-${100 - context.valueSig.value}%)` : undefined,
  );

  return (
    <div
      style={{ transform: translateXSig.value }}
      title="progress_indicator"
      {...context.dataAttributesSig.value}
      {...indicatorProps}
    />
  );
});
