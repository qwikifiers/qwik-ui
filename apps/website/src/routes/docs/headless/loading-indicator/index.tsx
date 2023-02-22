import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { LoadingIndicator } from '@qwik-ui/headless';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px }
  `);
  return (
    <div className="container">
      <h2>This is the documentation for the Loading Indicator</h2>

      <h1>Loading Indicator Example</h1>

      <LoadingIndicator
        style="font-size: 3rem"
        width="10px"
        trackColor="red"
        indicatorColor="pink"
      ></LoadingIndicator>
    </div>
  );
});
