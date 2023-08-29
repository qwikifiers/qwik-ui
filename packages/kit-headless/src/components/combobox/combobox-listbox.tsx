import {
  component$,
  useContext,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import {
  ReferenceElement,
  autoUpdate,
  computePosition,
  flip,
  offset,
} from '@floating-ui/dom';
import ComboboxContextId from './combobox-context-id';

export type ComboboxListboxProps = QwikIntrinsicElements['ul'];

export const ComboboxListbox = component$((props: ComboboxListboxProps) => {
  const context = useContext(ComboboxContextId);
  const listboxId = `${context.localId}-listbox`;

  useVisibleTask$(function setListboxPosition({ cleanup }) {
    // Our settings from Floating UI
    function updatePosition() {
      computePosition(
        context.inputRef.value as ReferenceElement,
        context.listboxRef.value as HTMLElement,
        {
          placement: 'bottom',
          middleware: [offset(8), flip()],
        },
      ).then(({ x, y }) => {
        if (context.listboxRef.value) {
          Object.assign(context.listboxRef.value.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        }
      });
    }

    if (context.inputRef.value && context.listboxRef.value) {
      updatePosition();

      const cleanupFunc = autoUpdate(
        context.inputRef.value,
        context.listboxRef.value,
        updatePosition,
      );

      cleanup(() => {
        cleanupFunc();
      });
    }
  });

  return (
    <ul
      id={listboxId}
      ref={context.listboxRef}
      aria-label={
        context.labelRef.value
          ? context.labelRef.value?.innerText
          : context.inputRef.value?.value
      }
      role="listbox"
      style={{ position: 'absolute' }}
      hidden={!context.isListboxOpenSig.value}
      {...props}
    >
      {context.options.value.map(
        (option, index) =>
          context.optionComponent$ && context.optionComponent$(option, index),
      )}
    </ul>
  );
});
