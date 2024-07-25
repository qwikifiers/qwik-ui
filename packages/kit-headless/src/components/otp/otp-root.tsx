import { component$, Slot } from '@builder.io/qwik';

export const OtpRoot = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
