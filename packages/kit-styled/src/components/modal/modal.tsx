import {
  PropsOf,
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { Modal as QwikUIModal } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const ModalContext = createContextId<Signal<boolean>>('modal-context');

export const ModalRoot = component$<PropsOf<typeof QwikUIModal.Root>>(({ ...props }) => {
  const showSig = useSignal(false);
  useContextProvider(ModalContext, showSig);
  return (
    <QwikUIModal.Root bind:show={showSig} {...props}>
      <Slot />
    </QwikUIModal.Root>
  );
});

export const ModalPanel = component$(() => {
  return (
    <QwikUIModal.Panel class="max-w-sm rounded-base border border-white bg-background p-6 text-foreground shadow-md transition-all duration-300 backdrop:brightness-50 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:duration-300 data-[state=open]:appear data-[state=closed]:disappear backdrop:data-[state=open]:appear backdrop:data-[state=closed]:disappear">
      <Slot />
    </QwikUIModal.Panel>
  );
});

export const ModalTrigger = component$<PropsOf<typeof QwikUIModal.Trigger>>(
  ({ ...props }) => {
    return (
      <QwikUIModal.Trigger>
        <Slot {...props} />
      </QwikUIModal.Trigger>
    );
  },
);

export const ModalTitle = component$<PropsOf<'h2'>>(({ ...props }) => {
  return (
    <QwikUIModal.Title
      {...props}
      class={cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class)}
    >
      <Slot />
    </QwikUIModal.Title>
  );
});

export const ModalDescription = component$<PropsOf<'p'>>(({ ...props }) => {
  return (
    <QwikUIModal.Description {...props} class={cn('text-sm font-light', props.class)}>
      <Slot />
    </QwikUIModal.Description>
  );
});
