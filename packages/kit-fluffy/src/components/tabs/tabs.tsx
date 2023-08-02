import { component$ } from '@builder.io/qwik';
import { Tabs as HeadlessTabs } from '@qwik-ui/headless';

export const Tabs = component$(() => {
  return (
    <HeadlessTabs class={}>
      <Slot />
    </HeadlessTabs>
  );
});
