import {
  component$,
  useSignal,
  useStyles$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { InputPhone } from '@qwik-ui/headless';
import {
  InputPhoneCountry,
  InputPhoneValidity,
} from 'packages/headless/src/components/input-phone/input-phone';
import styles from './input-phone.css?inline';

export default component$(() => {
  useStyles$(styles);

  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .container { width: 300px }
  `);

  const country = useSignal<InputPhoneCountry>();
  const number = useSignal<string>();
  const valid = useSignal<InputPhoneValidity>();

  return (
    <div class="container">
      <h2>This is the documentation for the Input Phone</h2>

      <h1>Input Phone Example</h1>

      <InputPhone
        // countryCode='ES'
        placeholder="Type your phone number"
        onCountryChange$={(value) => {
          country.value = value;
        }}
        onNumberChange$={(value) => {
          number.value = value;
        }}
        onValidChange$={(value) => {
          valid.value = value;
        }}
      />

      <hr />

      <h2>Inputs</h2>

      <ul>
        <li>
          <pre>placeholder</pre> type string | default Phone number
        </li>
        <li>
          <pre>countryCode</pre> type CountryCode | default undefined
        </li>
        <li></li>
      </ul>

      <hr />

      <h2>Outputs</h2>

      <ul>
        <li>
          <pre>onCountryChange$</pre>: {JSON.stringify(country.value) || '–'}
        </li>
        <li>
          <pre>onNumberChange$</pre>: {number.value || '–'}
        </li>
        <li>
          <pre>onValidChange$</pre>: {valid.value || '–'}
        </li>
      </ul>
    </div>
  );
});
