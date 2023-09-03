import { $, component$, useSignal, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import { InputPhone } from '@qwik-ui/headless';
import { InputPhoneCountry, InputPhoneValidity } from '@qwik-ui/headless';
import styles from './input-phone.css?inline';

export default component$(() => {
  useStyles$(styles);

  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .form-item, hr { width: 35em; }
   h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
   h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
  `);

  const country = useSignal<InputPhoneCountry>();
  const number = useSignal<string>();
  const valid = useSignal<InputPhoneValidity>();

  return (
    <>
      <p>This is the documentation for the Input Phone</p>

      <h2>Input Phone Example</h2>

      <h3>countryCode set to FR</h3>

      <div class="form-item">
        <InputPhone
          countryCode="FR"
          value="0645678990"
          placeholder="Type your phone number"
        />
      </div>

      <hr />

      <h3>countryCode unset</h3>

      <div class="form-item">
        <InputPhone value="0645678990" placeholder="Type your phone number" />
      </div>

      <hr />

      <h3>countryCode set to auto</h3>

      <div class="form-item">
        <InputPhone
          countryCode="auto"
          value="0481163"
          placeholder="Type your phone number"
          onCountryChange$={$((value?: InputPhoneCountry) => {
            country.value = value;
          })}
          onNumberChange$={$((value: string) => {
            number.value = value;
          })}
          onValidChange$={$((value: InputPhoneValidity) => {
            valid.value = value;
          })}
        />
      </div>

      <hr />

      <h3>Inputs</h3>

      <ul>
        <li>
          <pre>countryCode</pre> type CountryCode | default undefined
        </li>
        <li>
          <pre>placeholder</pre> type string | default "Phone number"
        </li>
        <li>
          <pre>value</pre> type string | default <em>empty</em>
        </li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li>
          <pre>onCountryChange$</pre>: <pre>{JSON.stringify(country.value) || '–'}</pre>
        </li>
        <li>
          <pre>onNumberChange$</pre>: {number.value || '–'}
        </li>
        <li>
          <pre>onValidChange$</pre>: {valid.value || '–'}
        </li>
      </ul>
    </>
  );
});
