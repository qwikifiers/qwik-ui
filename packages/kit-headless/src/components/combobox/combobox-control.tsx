import {
  component$,
  useSignal,
  Slot,
  useVisibleTask$,
  useContextProvider,
  type QwikIntrinsicElements
} from '@builder.io/qwik';

// import ComboboxContextId from './combobox-context-id';

import { ComboboxControlContextId } from './combobox-context-id';
import { ComboboxControlContext } from './combobox-context.type';

export type ComboboxControlProps = QwikIntrinsicElements['div'];

export const ComboboxControl = component$((props: ComboboxControlProps) => {
  const controlRef = useSignal<HTMLDivElement>();
  const inputRef = useSignal<HTMLElement>();
  const triggerRef = useSignal<HTMLButtonElement>();

  const controlContext: ComboboxControlContext = {
    inputRef,
    triggerRef
  };

  useContextProvider(ComboboxControlContextId, controlContext);

  useVisibleTask$(({ cleanup }) => {
    if (controlRef.value) {
      const handleMousedown = (e: MouseEvent): void => {
        const isTrigger = e.target === controlContext.triggerRef.value;
        const isTriggerDescendant =
          e.target && controlContext.triggerRef.value?.contains(e.target as Node);

        if (isTrigger || isTriggerDescendant) {
          e.preventDefault();
        }

        if (!controlContext.inputRef.value) {
          return;
        }

        controlContext.inputRef.value.focus();
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
