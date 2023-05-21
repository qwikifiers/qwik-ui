import { Slot, component$ } from '@builder.io/qwik';
import { Dialog } from '@qwik-ui/headless';

export const Root = component$((props: Dialog.RootProps) => {
  return (
    <Dialog.Root class="bg-slate-900 rounded-md text-white" {...props}>
      <Slot />
    </Dialog.Root>
  );
});

export const Trigger = Dialog.Trigger;
export const Close = Dialog.Close;

export const Content = Dialog.Content;
export const ContentTitle = Dialog.ContentTitle;
export const ContentText = Dialog.ContentText;
