import {
  $,
  Slot,
  component$,
  useContext,
  useOnWindow,
  useSignal,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import ComboboxContextId from './combobox-context-id';

export type ComboboxControlProps = QwikIntrinsicElements['div'];

export const ComboboxControl = component$((props: ComboboxControlProps) => {
  const context = useContext(ComboboxContextId);
  const controlRef = useSignal<HTMLDivElement>();

  // will break consumer customization of toggling listbox on input click
  const closeULOnOutsideClick$ = $((e: Event) => {
    const target = e.target as HTMLElement;
    if (
      context.isListboxOpenSig.value &&
      !context.listboxRef.value?.contains(target) &&
      !context.triggerRef.value?.contains(target)
    ) {
      context.isListboxOpenSig.value = false;
    }
  });

  useOnWindow('click', closeULOnOutsideClick$);

  useVisibleTask$(({ cleanup }) => {
    if (controlRef.value) {
      const handleMousedown = (e: MouseEvent): void => {
        const isTrigger = e.target === context.triggerRef.value;
        const isTriggerDescendant =
          e.target && context.triggerRef.value?.contains(e.target as Node);

        if (isTrigger || isTriggerDescendant) {
          e.preventDefault();
        }

        if (!context.inputRef.value) {
          return;
        }

        context.inputRef.value.focus();
      };

      controlRef.value.addEventListener('mousedown', handleMousedown);

      cleanup(() => {
        controlRef.value?.removeEventListener('mousedown', handleMousedown);
      });
    }
  });

  return (
    <div ref={controlRef} {...props}>
      <Slot />
    </div>
  );
});
