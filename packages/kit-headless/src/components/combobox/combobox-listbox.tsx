import {
  component$,
  useStyles$,
  useTask$,
  Slot,
  type PropsOf,
  useContext,
  $,
} from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import styles from './combobox.css?inline';
import { isServer } from '@builder.io/qwik/build';

type ComboboxListboxProps = PropsOf<'ul'>;

export const HComboboxListbox = component$<ComboboxListboxProps>((props) => {
  useStyles$(styles);

  const context = useContext(comboboxContextId);
  const listboxId = `${context.localId}-listbox`;

  const isOutside = $((rect: DOMRect, x: number, y: number) => {
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  });

  const handleDismiss$ = $(async (e: PointerEvent) => {
    if (!context.isListboxOpenSig.value) {
      return;
    }

    if (
      !context.listboxRef.value ||
      !context.triggerRef.value ||
      !context.inputRef.value
    ) {
      return;
    }

    const listboxRect = context.listboxRef.value.getBoundingClientRect();
    const triggerRect = context.triggerRef.value.getBoundingClientRect();
    const inputRect = context.inputRef.value.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutsideListbox = await isOutside(listboxRect, clientX, clientY);
    const isOutsideTrigger = await isOutside(triggerRect, clientX, clientY);
    const isOutsideInput = await isOutside(inputRect, clientX, clientY);

    if (isOutsideListbox && isOutsideTrigger && isOutsideInput) {
      context.isListboxOpenSig.value = false;
    }
  });

  // Dismiss code should only matter when the listbox is open
  useTask$(({ track, cleanup }) => {
    track(() => context.isListboxOpenSig.value);

    if (isServer) return;

    if (context.isListboxOpenSig.value) {
      window.addEventListener('pointerdown', handleDismiss$);
    }

    cleanup(() => {
      window.removeEventListener('pointerdown', handleDismiss$);
    });
  });

  return (
    <ul
      {...props}
      id={listboxId}
      role="listbox"
      ref={context.listboxRef}
      aria-expanded={context.isListboxOpenSig.value ? 'true' : undefined}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
    >
      <Slot />
    </ul>
  );
});
