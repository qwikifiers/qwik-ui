import { component$, useStyles$ } from '@builder.io/qwik';
import { Rating } from '@qwik-ui/headless';
import styles from './index.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="mt-2 flex flex-col gap-3">
      <h2>This is the documentation for the Rating</h2>
      <h3>Basic Example </h3>
      <Rating.Root />
      <h3>OnChange event </h3>
      <Rating.Root onChange$={(index) => window.alert(index)} />
      <h3>Custom Icons </h3>
      <Rating.Root icon={MyStarIcon} />
      <Rating.Root icon={MyHeartIcon} />️
      <Rating.Root icon={MyComponentIcon} />
      <h3>Custom Length </h3>
      <Rating.Root total={3} />
      <Rating.Root total={10} />
      <h3>Default Values </h3>
      <Rating.Root value={2} total={3} />
      <Rating.Root value={3} total={10} />
    </div>
  );
});

export const MyStarIcon = component$(() => <>💩</>);
export const MyHeartIcon = component$(() => <div class="text-4xl text-red-500">♥️</div>);
export const MyComponentIcon = component$(() => (
  <div class="m-1 flex h-8 w-8 items-center justify-center rounded-base bg-green-400 p-1" />
));
