import {
  component$,
  useSignal,
  useStyles$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Switch } from '@qwik-ui/headless';
import styles from './switch.css?inline';

export default component$(() => {
  useStyles$(styles);

  useStylesScoped$(`
   h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
   .form-item, hr { width: 35em; }
   h2 { margin-block: 1.15em 0.5em; font-size: xx-large; }
   h3 { margin-block: 0.85em 0.35em; font-size: x-large; }
  `);

  const checkedSignal = useSignal(false);

  return (
    <>
      <p>This is the documentation for the Switch</p>

      <h2>Switch Example</h2>

      <div class="form-item">
        <Switch
          checked={checkedSignal.value}
          onChange$={(_, { checked }) => {
            checkedSignal.value = checked;
          }}
        />
      </div>

      <h2>Switch Example, readonly</h2>

      <div class="form-item">
        <Switch
          checked={checkedSignal.value}
          readOnly={true}
          onChange$={(_, { checked }) => {
            checkedSignal.value = checked;
          }}
        />
      </div>

      <h2>Switch Example, disabled</h2>

      <div class="form-item">
        <Switch
          checked={checkedSignal.value}
          disabled={true}
          onChange$={(_, { checked }) => {
            checkedSignal.value = checked;
          }}
        />
      </div>

      <hr />

      <h3>Styles</h3>

      <ul>
        <li>
          <pre>--color-accent</pre> background color on active
        </li>
        <li>
          <pre>--color-background</pre> background color on intactive
        </li>
        <li>
          <pre>--color-trigger</pre> trigger color
        </li>
      </ul>

      <hr />

      <h3>Inputs</h3>

      <ul>
        <li>As same as any input type checkbox</li>
      </ul>

      <hr />

      <h3>Outputs</h3>

      <ul>
        <li>As same as any input type checkbox</li>
      </ul>
    </>
  );
});
