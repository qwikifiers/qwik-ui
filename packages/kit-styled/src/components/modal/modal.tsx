import {
  PropsOf,
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { Modal as HeadlessModal } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Context = createContextId<Signal<boolean>>('modal-context');

const Root = component$<PropsOf<typeof HeadlessModal.Root>>(({ ...props }) => {
  const showSig = useSignal(false);
  useContextProvider(Context, showSig);
  return (
    <HeadlessModal.Root bind:show={showSig} {...props}>
      <Slot />
    </HeadlessModal.Root>
  );
});

const Panel = component$(() => {
  return (
    <HeadlessModal.Panel class="max-w-sm rounded-base border border-white bg-background p-6 text-foreground shadow-md transition-all duration-300 backdrop:brightness-50 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-300 data-[state=open]:appear data-[state=closed]:disappear backdrop:data-[state=open]:appear backdrop:data-[state=closed]:disappear">
      <Slot />
    </HeadlessModal.Panel>
  );
});

const Trigger = component$<PropsOf<typeof HeadlessModal.Trigger>>(({ ...props }) => {
  return (
    <HeadlessModal.Trigger>
      <Slot {...props} />
    </HeadlessModal.Trigger>
  );
});

const Title = component$<PropsOf<'h2'>>(({ ...props }) => {
  return (
    <HeadlessModal.Title
      {...props}
      class={cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class)}
    >
      <Slot />
    </HeadlessModal.Title>
  );
});

const Description = component$<PropsOf<'p'>>(({ ...props }) => {
  return (
    <HeadlessModal.Description {...props} class={cn('text-sm font-light', props.class)}>
      <Slot />
    </HeadlessModal.Description>
  );
});

export const Modal = {
  Root,
  Panel,
  Trigger,
  Title,
  Description,
  Context,
};
