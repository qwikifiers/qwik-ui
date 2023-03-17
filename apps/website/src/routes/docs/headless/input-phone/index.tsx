import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import { InputPhone } from '@qwik-ui/headless';
import styles from './input-phone.css?inline';

export default component$(() => {
  useStyles$(styles);

  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .container { width: 300px }
  `);

  return (
    <div class="container">
      <h2>This is the documentation for the Input Phone</h2>

      <h1>Input Phone Example</h1>

      <InputPhone
        countryCode="US"
        onInput$={(_, { value }) => console.log({ value })}
      />
    </div>
  );
});
