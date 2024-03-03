import { component$, useStyles$, Slot, type PropsOf, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';
import styles from './select.css?inline';

type SelectListboxProps = PropsOf<'ul'>;

export const SelectListbox = component$<SelectListboxProps>((props) => {
  useStyles$(styles);

  const context = useContext(SelectContextId);
  const listboxId = `${context.localId}-listbox`;
  return (
    <ul
      {...props}
      id={listboxId}
      role="listbox"
      ref={context.listboxRef}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
    >
      <Slot />
    </ul>
  );
});
