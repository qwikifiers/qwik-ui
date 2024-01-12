import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type SelectMarkerProps = PropsOf<'span'>;

export const SelectMarker = component$((props: SelectMarkerProps) => {
  return (
    <span aria-hidden="true" {...props}>
      <Slot />
    </span>
  );
});
