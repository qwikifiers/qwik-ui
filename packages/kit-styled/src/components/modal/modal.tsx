import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Modal as HeadlessModal } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = HeadlessModal.Root;

const Trigger = HeadlessModal.Trigger;

const Close = HeadlessModal.Close;

const Panel = component$<PropsOf<typeof HeadlessModal.Panel>>((props) => {
  return (
    <HeadlessModal.Panel
      {...props}
      class={cn(
        'max-w-sm rounded-base border bg-background p-6 text-foreground shadow-md backdrop:brightness-50 backdrop:backdrop-blur-sm',
        'data-[closed]:duration-300 data-[open]:duration-300 data-[open]:animate-in data-[closing]:animate-out data-[closing]:fade-out data-[open]:fade-in',
        'backdrop:data-[closed]:duration-300 backdrop:data-[open]:duration-300 backdrop:data-[open]:animate-in backdrop:data-[closing]:animate-out backdrop:data-[closing]:fade-out backdrop:data-[open]:fade-in',
        props.class,
      )}
    >
      <Slot />
    </HeadlessModal.Panel>
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
  Trigger,
  Close,
  Panel,
  Title,
  Description,
};
