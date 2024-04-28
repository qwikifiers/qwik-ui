import { Slot, component$, useContext } from '@builder.io/qwik';
import { selectOptionContextId } from './select-context';

export const SelectItemIndicator = component$(() => {
  const selectContext = useContext(selectOptionContextId);

  return <>{selectContext.isSelectedSig.value && <Slot />}</>;
});
