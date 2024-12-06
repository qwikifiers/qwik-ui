import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { selectItemContextId } from './select-context';

export const HSelectItemIndicator = component$<PropsOf<'span'>>((props) => {
  const selectContext = useContext(selectItemContextId);

  return (
    <span aria-hidden="true" {...props}>
      {selectContext.isSelectedSig.value && <Slot />}
    </span>
  );
});
