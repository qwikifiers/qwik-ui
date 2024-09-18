import { component$, useComputed$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';
import styles from '../snippets/toggle.css?inline';

export default component$(() => {
  useStyles$(styles);
  const pressedState = useSignal(true);

  const text = useComputed$(() => {
    return pressedState.value ? 'You pressed me' : 'You unpressed me';
  });

  return (
    <div class="toggle-container container-center">
      <Toggle bind:pressed={pressedState} class="toggle">
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
