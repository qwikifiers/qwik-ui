import {
  $,
  Slot,
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements
} from '@builder.io/qwik';
import { computePosition, flip } from '@floating-ui/dom';
import ComboboxContextId from './combobox-context-id';

export type ComboboxListboxProps = QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$((props: ComboboxListboxProps) => {
  // error because we are using context inside of the listbox when it
  const context = useContext(ComboboxContextId);

  const updatePosition$ = $(
    (referenceEl: HTMLInputElement, floatingEl: HTMLUListElement) => {
      computePosition(referenceEl, floatingEl, {
        placement: 'bottom',
        middleware: [flip()]
      }).then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  );

  useVisibleTask$(async function updateListboxPosition() {
    if (context.inputRef.value && context.listboxRef.value) {
      await updatePosition$(context.inputRef.value, context.listboxRef.value);
    }
  });

  return (
    <ul
      ref={context.listboxRef}
      style={{ position: 'absolute', zIndex: 9999 }}
      hidden={!context.isListboxOpenSig.value}
      role="listbox"
      {...props}
    >
      <Slot />
    </ul>
  );
});
