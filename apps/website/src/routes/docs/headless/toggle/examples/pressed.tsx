import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Toggle } from '@qwik-ui/headless';
import styles from '../snippets/toggle.css?inline';

export default component$(() => {
  useStyles$(styles);
  const text = useSignal('Unpress me');
  return (
    <div class="toggle-container container-center">
      <Toggle
        pressed
        onPressedChange$={(p) =>
          p ? (text.value = 'Unpress me') : (text.value = 'Press me')
        }
        class="toggle"
      >
        Hello
      </Toggle>
      <span>{text.value}</span>
    </div>
  );
});
