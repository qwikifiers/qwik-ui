import { component$ } from '@builder.io/qwik';
import { Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <CompOne>
      <div q:slot="test-named">Hey</div>
    </CompOne>
  );
});

export const CompOne = component$(() => {
  return (
    <CompThree>
      <Slot name="test-named" />
    </CompThree>
  );
});

export const CompTwo = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});

export const CompThree = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
