import { component$, useSignal } from '@builder.io/qwik';
import { Toggle } from '~/components/ui';

export default component$(() => {
  const text = useSignal('Unpress me');
  return (
    <div class="flex flex-col">
      <Toggle
        pressed
        onPressedChange$={(p) =>
          p ? (text.value = 'Unpress me') : (text.value = 'Press me')
        }
      >
        Hello
      </Toggle>
      <span>{text.value}</span>
    </div>
  );
});
