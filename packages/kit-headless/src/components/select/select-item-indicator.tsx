import { Slot, component$, useContext } from '@builder.io/qwik';
import { selectItemContextId } from './select-context';

export const HSelectItemIndicator = component$(() => {
  const selectContext = useContext(selectItemContextId);

  return <>{selectContext.isSelectedSig.value && <Slot />}</>;
});
