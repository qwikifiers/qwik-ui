import { component$, PropsOf, Slot, useId } from '@builder.io/qwik';
export const SwitchLabel = component$<PropsOf<'label'>>((rest) => {
  const id = useId();
  return (
    <label aria-label="switch-label" for={`switch-${id}`} data-switch-label {...rest}>
      <Slot />
    </label>
  );
});
