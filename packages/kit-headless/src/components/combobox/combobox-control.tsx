import {
  component$,
  useSignal,
  useContext,
  Slot,
  type QwikIntrinsicElements
} from '@builder.io/qwik';

import ComboboxContextId from './combobox-context-id';

export type ComboboxControlProps = QwikIntrinsicElements['div'];

export const ComboboxControl = component$((props: ComboboxControlProps) => {
  const ref = useSignal<HTMLElement>();

  return (
    <div ref={ref} {...props}>
      <Slot />
    </div>
  );
});
