import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import { Button } from '@qwik-ui/styled';
import { extractThemeCSS } from '@qwik-ui/utils';
import { LuX } from '@qwikest/icons/lucide';
import { useTheme } from 'qwik-themes';
import globalCSS from '~/global.css?raw';

export default component$(() => {
  const showSig = useSignal(false);

  const cssThemeOutput = useSignal<string>('');

  const { theme } = useTheme();

  return (
    <>
      <Button
        onClick$={() => {
          showSig.value = true;
          cssThemeOutput.value = extractThemeCSS(
            theme === 'dark' || theme === 'light'
              ? 'border-radius-0 simple primary-cyan-600 light base-slate'
              : theme,
            globalCSS,
          );
        }}
      >
        Copy code
      </Button>
      <Modal
        bind:show={showSig}
        class="my-animation h-full max-w-2xl overflow-x-hidden rounded-base bg-background p-8 text-foreground shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Copy config</h2>
          <p>
            Copy and paste the following code into your global.css file to apply the
            styles.
          </p>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <div>
            <pre>
              <code>{cssThemeOutput.value}</code>
            </pre>
          </div>
        </ModalContent>
        <button
          onClick$={() => (showSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <LuX class="h-8 w-8" />
        </button>
      </Modal>
    </>
  );
});
