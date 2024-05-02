import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Label } from '@qwik-ui/headless';
import styles from '../snippets/label.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div
      class="label-container"
      style={{
        display: 'flex',
        padding: '0 20px',
        flexWrap: 'wrap',
        gap: 15,
        alignItems: 'center',
      }}
    >
      <Label.Root class="label" for="firstName">
        First name
      </Label.Root>
      <input class="input" type="text" id="firstName" placeholder="John Doe" />
    </div>
  );
});
