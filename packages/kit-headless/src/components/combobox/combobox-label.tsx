import { Slot, component$, type QwikIntrinsicElements } from '@builder.io/qwik';

export type ComboboxLabelProps = QwikIntrinsicElements['label'];

export const ComboboxLabel = component$((props: ComboboxLabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});
