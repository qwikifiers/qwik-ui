import {
  Slot,
  component$,
  useSignal,
  type QwikIntrinsicElements
} from '@builder.io/qwik';

export type AutocompleteControlProps = QwikIntrinsicElements['div'];

export const AutocompleteControl = component$((props: AutocompleteControlProps) => {
  const ref = useSignal<HTMLElement>();

  return (
    <div ref={ref} {...props}>
      <Slot />
    </div>
  );
});
