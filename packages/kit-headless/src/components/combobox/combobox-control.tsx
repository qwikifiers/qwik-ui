import {
  Slot,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import ComboboxContextId from './combobox-context-id';

export type ComboboxControlProps = QwikIntrinsicElements['div'];

export const ComboboxControl = component$((props: ComboboxControlProps) => {
  const context = useContext(ComboboxContextId);
  const controlRef = useSignal<HTMLDivElement>();

  useVisibleTask$(function preventFocusChangeTask({ cleanup }) {
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
