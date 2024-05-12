import { component$, useStyles$ } from '@builder.io/qwik';
import { Label } from '@qwik-ui/headless';
import styles from '../snippets/label.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="label-container">
      <Label class="label" for="firstName">
        First name
      </Label>
      <input class="input" type="text" id="firstName" placeholder="John Doe" />
    </div>
  );
});
