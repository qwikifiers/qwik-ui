import {
  component$,
  useSignal,
  useContext,
  Slot,
  type QwikIntrinsicElements,
  useVisibleTask$,
  useContextProvider
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
        if (e.target === triggerRef.value) {
          e.preventDefault();
        }
        inputRef.value!.focus();
        console.log(e.target, e.currentTarget);
      };

      controlRef.value.addEventListener('mousedown', handleMousedown);

      cleanup(() => {
        controlRef.value!.removeEventListener('mousedown', handleMousedown);
      });
    }
  });

  return (
    <div ref={controlRef} {...props}>
      <Slot />
    </div>
  );
});
