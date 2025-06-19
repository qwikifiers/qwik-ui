import { component$, useSignal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import { Button } from '~/components/ui';
import { extractThemeCSS } from '@qwik-ui/utils';
import { LuX } from '@qwikest/icons/lucide';
import { useTheme } from '@qwik-ui/themes';
import globalCSS from '~/global.css?raw';
import { Highlight } from '../highlight/highlight';

export default component$(() => {
  const showSig = useSignal(false);

  const cssThemeOutput = useSignal<string>('');

  const { themeSig, defaultTheme, storageKey } = useTheme();

  return (
    <Modal.Root bind:show={showSig}>
      <Button
        onClick$={() => {
          themeSig.value = localStorage.getItem(storageKey) ?? defaultTheme;
          cssThemeOutput.value = extractThemeCSS(
            themeSig.value === 'dark' || themeSig.value === 'light'
              ? 'border-radius-0 simple primary-cyan-600 light base-slate'
              : themeSig.value,
            globalCSS,
          );
          showSig.value = true;
        }}
      >
        Copy code
      </Button>
      <Modal.Panel class="my-animation rounded-base bg-background text-foreground h-[650px] max-w-2xl overflow-x-hidden p-8 shadow-md backdrop:backdrop-blur-sm backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100">
        <header>
          <h2 class="mb-2 text-lg font-bold">Copy config</h2>
          <p class="mb-6">
            Copy and paste the following code into your global.css file to apply the
            styles.
          </p>
        </header>
        <div>
          <Highlight code={cssThemeOutput.value} language="css" class="border" />
        </div>
        <button onClick$={() => (showSig.value = false)} class="absolute top-7 right-6">
          <LuX class="h-8 w-8" />
        </button>
      </Modal.Panel>
    </Modal.Root>
  );
});
