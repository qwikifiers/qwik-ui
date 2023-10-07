import { component$, useSignal } from '@builder.io/qwik';
import { ModalContent, ModalFooter, ModalHeader, ModalRoot } from '@qwik-ui/headless';

export default component$(() => {
  const showSignal = useSignal(false);

  return (
    <>
      <button
        class="p-1 focus:outline-[var(--qwik-light-blue)]"
        onClick$={() => (showSignal.value = true)}
      >
        Open Modal
      </button>
      <ModalRoot bind:show={showSignal} class="rounded-md p-4 shadow-md">
        <ModalHeader>
          <h2 class="text:md font-bold">Are your sure?</h2>
        </ModalHeader>
        <ModalContent class="pb-4 pt-4">
          <p>Yes, I want to remove my account.</p>
        </ModalContent>
        <ModalFooter class="flex justify-end gap-4">
          <button
            class="rounded-sm border border-[var(--qwik-light-blue)] p-2 text-[var(--qwik-light-blue)]"
            onClick$={() => (showSignal.value = false)}
          >
            No
          </button>
          <button
            class="rounded-sm bg-[var(--qwik-light-blue)] p-2"
            onClick$={() => (showSignal.value = false)}
          >
            Yes
          </button>
        </ModalFooter>
      </ModalRoot>
    </>
  );
});
