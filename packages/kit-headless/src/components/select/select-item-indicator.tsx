import { Slot, component$, useContext } from '@builder.io/qwik';
import { selectItemContextId } from './select-context';

export const SelectItemIndicator = component$(() => {
  const selectContext = useContext(selectItemContextId);

  return <>{selectContext.isSelectedSig.value && <Slot />}</>;
});
