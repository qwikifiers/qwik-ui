import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Radio } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px } Accordion {border: 1px solid white}
  `);
  return (
    <>
      <div class="container">
        <Radio
          className="mt-5"
          name="radio-test"
          value={['first', 'second', 'third']}
        />
      </div>
    </>
  );
});
