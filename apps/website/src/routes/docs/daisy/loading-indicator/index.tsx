import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { LoadingIndicator } from '@qwik-ui/theme-daisy';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px } Accordion {border: 1px solid white}
  `);
  return (
    <>
      <div className="container">
        <h2>This is the documentation for the Loading Indicator</h2>

        <h1>Loading Indicator Example</h1>
        <LoadingIndicator speed={'6s'} class="text-xl"></LoadingIndicator>
      </div>
    </>
  );
});
