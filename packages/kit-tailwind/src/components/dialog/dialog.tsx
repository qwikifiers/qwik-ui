import { Slot, component$ } from '@builder.io/qwik';
import { Dialog } from '@qwik-ui/headless';

export const Root = Dialog.Root;

export const Trigger = Dialog.Trigger;

export const Close = Dialog.Close;

export const Portal = component$(() => {
  return (
    <Dialog.Content class="bg-slate-900 rounded-md text-white">
      <Slot />
    </Dialog.Content>
  );
});
