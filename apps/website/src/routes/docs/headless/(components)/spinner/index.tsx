import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Spinner } from '@qwik-ui/headless';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 0.5rem 0 1rem 0; padding-top: 1rem; font-weight: bold; }
    p { margin-bottom: 0.5rem; }
  `);
  return (
    <>
      <h2>This is the documentation for the Spinner</h2>

      <h1>Spinner Example</h1>

      <Spinner />

      <h1>Size</h1>
      <p>
        Spinner are sized based on the font size. To change their size, set the{' '}
        <b>font-size</b> property on the Spinner itself or on a parent element as shown
        below.
      </p>

      <Spinner />
      <Spinner style="font-size: 2rem" />
      <Spinner style="font-size: 3rem" />

      <h1>Track Width</h1>
      <p>
        The width of the Spinner track can be changed by the property <b>width</b>.
      </p>

      <Spinner style="font-size: 3rem" width="10px" />

      <h1>Color</h1>
      <p>
        The colors of Spinner can be changed by the properties <b>indicatorColor</b> and{' '}
        <b>trackColor</b>.
      </p>
      <Spinner
        style="font-size: 3rem"
        width="10px"
        indicatorColor="darkblue"
        trackColor="lightblue"
      />

      <h1>Speed</h1>
      <p>
        The speed of the Spinner can be changed by the property <b>speed</b>.
      </p>
      <Spinner style="font-size: 3rem" speed="5s" />
    </>
  );
});
