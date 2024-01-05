import {
  component$,
  useSignal,
  type QwikIntrinsicElements,
  useStyles$,
} from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import styles from '../snippets/animation.css?inline';

export default component$(() => {
  const showSig = useSignal(false);
  useStyles$(styles);

  return (
    <>
      <button
        onClick$={() => {
          showSig.value = true;
        }}
        class="hover:bg-accent/80 rounded-md border px-3 py-2"
      >
        Open Modal
      </button>
      <Modal
        bind:show={showSig}
        class="my-animation shadow-dark-medium bg-background text-foreground max-w-[25rem] rounded-md p-[28px] backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
      >
        <ModalHeader>
          <h2 class="text-lg font-bold">Edit Profile</h2>
        </ModalHeader>
        <ModalContent class="mb-2 py-4">
          <p class="mb-4 leading-5">
            You can update your profile here. Hit the save button when finished.
          </p>
          <div class="mb-1 flex items-baseline justify-between">
            <label for="name">Name</label>
            <input
              class="bg-background text-foreground mt-2 rounded-sm px-4 py-[10px]"
              id="name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div class="flex items-baseline justify-between">
            <label for="email">Email</label>
            <input
              class="bg-background text-foreground mt-2 rounded-sm px-4 py-3"
              id="email"
              type="text"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </ModalContent>
        <ModalFooter class="flex justify-end gap-4">
          <button
            class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-sm border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick$={() => (showSig.value = false)}
          >
            Cancel
          </button>
          <button
            class="bg-primary text-primary-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-primary/90 rounded-sm border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
        fill="currentColor"
        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}
