import { type QwikIntrinsicElements, component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';

export default component$(() => {
  const showSig = useSignal(false);

  return (
    <>
      <button
        onClick$={() => (showSig.value = true)}
        class="rounded-md border-2 border-slate-300 bg-slate-700 px-3 py-2 text-white"
      >
        Open Modal
      </button>
      <Modal
        closeOnBackdropClick={false}
        bind:show={showSig}
        class="shadow-dark-medium my-backdrop max-w-[25rem] rounded-md bg-white p-[28px] text-slate-950"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Edit Profile</h2>
        </ModalHeader>
        <ModalContent class="mb-2 pb-4 pt-2">
          <p class="mb-4 leading-5">
            You can update your profile here. Hit the save button when finished.
          </p>
          <fieldset class="mb-1 flex items-baseline justify-between">
            <label for="name">Name</label>
            <input
              class="mt-2 rounded-sm px-4 py-[10px] text-white"
              id="name"
              type="text"
              placeholder="John Doe"
            />
          </fieldset>
          <fieldset class="flex items-baseline justify-between">
            <label for="email">Email</label>
            <input
              class="mt-2 rounded-sm px-4 py-3 text-white"
              id="email"
              type="text"
              placeholder="johndoe@gmail.com"
            />
          </fieldset>
        </ModalContent>
        <ModalFooter class="flex justify-end gap-4">
          <button
            class="rounded-sm border border-none bg-slate-200 px-4 py-[10px] text-slate-600 outline-none focus-visible:outline-slate-700"
            onClick$={() => (showSig.value = false)}
          >
            Cancel
          </button>
          <button
            class="rounded-sm border border-none bg-green-200 px-4 py-[10px] text-green-900 outline-none focus-visible:outline-green-700"
            onClick$={() => (showSig.value = false)}
          >
            Save Changes
          </button>
        </ModalFooter>
        <button
          onClick$={() => (showSig.value = false)}
          class="absolute right-6 top-[26px]"
        >
          <CloseIcon class="h-8 w-8" />
        </button>
      </Modal>
    </>
  );
});

export function CloseIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} key={key}>
      <path
        fill="020617"
        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}
