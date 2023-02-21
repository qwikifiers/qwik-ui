import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { Radio } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    .container { width: 300px } Accordion {border: 1px solid white}
    .panel {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `);

  let count = useSignal('primary');
  return (
    <>
      <div class="container">
        <h2>This is the documentation for the Radio</h2>
        <div class="panel mt-5 flex-col">
          <h2>Selected vatiant: {count.value}</h2>
          <div>
            <Radio
              variant="primary"
              class="mt-5"
              name="radio"
              value="primary"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
              checked
            />
            <Radio
              variant="secondary"
              class="mt-5"
              name="radio"
              value="secondary"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
            <Radio
              variant="accent"
              class="mt-5"
              name="radio"
              value="accent"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
            <Radio
              variant="info"
              class="mt-5"
              name="radio"
              value="info"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
            <Radio
              variant="success"
              class="mt-5"
              name="radio"
              value="success"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
            <Radio
              variant="warning"
              class="mt-5"
              name="radio"
              value="warning"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
            <Radio
              variant="error"
              class="mt-5"
              name="radio"
              value="error"
              onChange$={(e) => {
                count.value = e.target.value;
              }}
            />
          </div>

          <h2 class="mt-5">Primary Example</h2>
          <div>
            <Radio
              variant="primary"
              name="radio-Selected"
              value="first"
              checked
            />
            <Radio variant="primary" name="radio-Selected" value="second" />
          </div>
        </div>
      </div>
    </>
  );
});
