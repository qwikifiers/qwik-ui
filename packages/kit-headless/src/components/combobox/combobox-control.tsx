import {
  component$,
  useSignal,
  Slot,
  useVisibleTask$,
  useContextProvider,
  type QwikIntrinsicElements,
  useOnWindow,
  $,
  useContext
} from '@builder.io/qwik';

import ComboboxContextId from './combobox-context-id';

import { ComboboxControlContextId } from './combobox-context-id';
import { ComboboxControlContext } from './combobox-context.type';

export type ComboboxControlProps = QwikIntrinsicElements['div'];

export const ComboboxControl = component$((props: ComboboxControlProps) => {
  const context = useContext(ComboboxContextId);
  const controlRef = useSignal<HTMLDivElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const triggerRef = useSignal<HTMLButtonElement>();

  const controlContext: ComboboxControlContext = {
    inputRef,
    triggerRef
  };

  useContextProvider(ComboboxControlContextId, controlContext);

  const closeULOnOutsideClick$ = $((e: Event) => {
    const target = e.target as HTMLElement;
    if (
      context.isListboxOpenSig.value &&
      !context.listboxRef.value?.contains(target) &&
      !controlContext.triggerRef.value?.contains(target)
    ) {
      context.isListboxOpenSig.value = false;
    }
  });

  useOnWindow('click', closeULOnOutsideClick$);

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
