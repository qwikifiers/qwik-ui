import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type SelectLabelProps = QwikIntrinsicElements['label'];

export const SelectLabel = component$((props: SelectLabelProps) => {
  return (
    <label {...props}>
      <Slot />
    </label>
  );
});
