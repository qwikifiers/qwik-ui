import { component$, useSignal } from '@builder.io/qwik';
import { Radio } from '@qwik-ui/primitives';

export default component$(() => {
  const radioValue = useSignal('first');

  return (
    <div class="mt-2 flex flex-col gap-3">
      <h2>This is the documentation for the Radio</h2>
      <h3>Basic Example </h3>
      <div class="flex gap-1">
        <Radio name="one" />
        <Radio name="one" />
        <Radio name="one" />
      </div>

      <h3 class="mt-5">Change value Example </h3>
      <p>Selected radio: {radioValue.value}</p>
      <div class="flex gap-1">
        <Radio
          name="two"
          value="first"
          checked
          onChange$={(e) => {
            radioValue.value = (e.target as HTMLInputElement).value;
          }}
        />
        <Radio
          name="two"
          value="second"
          onChange$={(e) => {
            radioValue.value = (e.target as HTMLInputElement).value;
          }}
        />
        <Radio
          name="two"
          value="third"
          onChange$={(e) => {
            radioValue.value = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
    </div>
  );
});
