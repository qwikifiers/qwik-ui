import { component$, useStyles$ } from '@builder.io/qwik';
import { Rating } from '@qwik-ui/headless';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="flex flex-col gap-3 mt-2">
      <h2>This is the documentation for the Rating</h2>

      <h3>Basic Example </h3>
      <Rating />

      <h3>OnChange event </h3>
      <Rating
        onChange$={(idx) => window.alert(idx)}
      />

      <h3>Custom Icons </h3>
      <Rating icon={ MyStarIcon } />
      <Rating icon={ MyHeartIcon } />️
      <Rating icon={ MyComponentIcon } />

      <h3>Custom Length </h3>
      <Rating total={3} />
      <Rating total={10} />


      <h3>Default Values </h3>
      <Rating value={2} total={3} />
      <Rating value={3} total={10} />


    </div>
  );
});


export const MyStarIcon = component$(() => <>💩</>)
export const MyHeartIcon = component$(() => <div className="text-red-500 text-4xl">♥️</div>)
export const MyComponentIcon = component$(() =>
  <div class="bg-green-400 rounded-xl w-8 h-8 p-1 m-1 flex justify-center items-center" />
)
