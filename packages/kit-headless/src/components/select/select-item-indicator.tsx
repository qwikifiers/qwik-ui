import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
import { selectItemContextId } from './select-context';

export const HSelectItemIndicator = component$<PropsOf<'span'>>((props) => {
  const selectContext = useContext(selectItemContextId);

  return (
    <span aria-hidden="true" {...props}>
      {selectContext.isSelectedSig.value && <Slot />}
    </span>
  );
});
