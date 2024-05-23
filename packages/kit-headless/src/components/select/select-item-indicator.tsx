import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { selectItemContextId } from './select-context';

export const HSelectItemIndicator = component$<PropsOf<'span'>>(() => {
  const selectContext = useContext(selectItemContextId);

  return <span>{selectContext.isSelectedSig.value && <Slot />}</span>;
});
