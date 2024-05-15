import { Slot, component$, useContext, useSignal, $, PropsOf } from '@builder.io/qwik';

import ComboboxContextId from './combobox-context-id';

export type ComboboxControlProps = PropsOf<'div'>;

export const HComboboxControl = component$((props: ComboboxControlProps) => {
  const context = useContext(ComboboxContextId);
  const controlRef = useSignal<HTMLDivElement>();

  const handleMousedown$ = $(() => {
    if (controlRef.value) {
      context.inputRef.value?.focus();

      if (!context.inputRef.value) {
        return;
      }
    }
  });

  return (
    <div
      ref={controlRef}
      {...props}
      preventdefault:mousedown
      onMouseDown$={[handleMousedown$, props.onMouseDown$]}
    >
      <Slot />
    </div>
  );
});
