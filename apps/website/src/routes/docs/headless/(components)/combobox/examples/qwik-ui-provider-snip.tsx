import { QwikUIProvider } from '@qwik-ui/headless';
import { Slot, component$ } from '@builder.io/qwik';

// wrap as a direct child to the body tag

export default component$(() => {
  return (
    <QwikUIProvider>
      <main>
        <Slot />
      </main>
    </QwikUIProvider>
  );
});
