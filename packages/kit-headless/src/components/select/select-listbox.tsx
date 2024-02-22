import { component$, Slot, type PropsOf, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

type SelectListboxProps = PropsOf<'ul'>;

export const SelectListbox = component$<SelectListboxProps>((props) => {
  const context = useContext(SelectContextId);
  return (
    <ul
      {...props}
      hidden={!context.isListboxOpenSig.value}
      ref={context.listboxRef}
      data-state={context.isListboxOpenSig.value ? 'open' : 'closed'}
    >
      <Slot />
    </ul>
  );
});
