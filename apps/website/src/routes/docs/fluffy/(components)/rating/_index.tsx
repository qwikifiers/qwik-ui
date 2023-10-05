import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Rating } from '@qwik-ui/tailwind';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }`);

  return (
    <>
      <h2>This is the documentation for the Rating</h2>
      <h3>Basic Example </h3>
      <Rating />
      <h3>OnChange event </h3>
      <Rating onChange$={(idx) => window.alert(idx)} />
      <h3>Custom Daisy Icon Mask </h3>
      <Rating mask="mask-heart bg-red-400" />
      <h3>Custom Length </h3>
      <Rating total={3} />
      <br />
      <Rating total={10} />
      <h3>Custom Icon </h3>
      <Rating icon={MyCustomIcon1} />️
      <br />
      <Rating icon={MyCustomIcon2} />
      <h3>Default Values </h3>
      <Rating value={2} total={3} />
      <br />
      <Rating value={3} total={10} />
    </>
  );
});

export const MyCustomIcon1 = component$(() => <>💩</>);
export const MyCustomIcon2 = component$(() => (
  <div class="m-1 flex h-8 w-8 items-center justify-center rounded-xl bg-green-400 p-1"></div>
));
