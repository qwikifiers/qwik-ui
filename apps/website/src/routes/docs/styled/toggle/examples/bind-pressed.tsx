import { component$, useComputed$, useSignal } from '@builder.io/qwik';
import { Toggle } from '~/components/ui';

export default component$(() => {
  const pressedState = useSignal(true);

  const text = useComputed$(() => {
    return pressedState.value ? 'You pressed me' : 'You unpressed me';
  });

  return (
    <div class="flex flex-col items-center justify-center">
      <Toggle bind:pressed={pressedState} class="shrink-0">
        Hello
      </Toggle>

      <span>{text.value}</span>
      <button
        style={{ border: '1px solid black', padding: '10px' }}
        onClick$={() => (pressedState.value = true)}
      >
        I can only press
      </button>
    </div>
  );
});
