import { Slot, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

type SelectIndicatorProps = {
  _indicatorIndex?: number;
};

export const SelectIndicator = component$((props: SelectIndicatorProps) => {
  // see select-inline.tsx for more context
  const { _indicatorIndex } = props;

  const context = useContext(SelectContextId);

  return <>{context.selectedIndexesSig.value.includes(_indicatorIndex!) && <Slot />}</>;
});
