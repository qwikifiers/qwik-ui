import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Modal as HeadlessModal } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const Root = HeadlessModal.Root;

const Trigger = HeadlessModal.Trigger;

const Close = HeadlessModal.Close;

export const panelVariants = cva(
  [
    'bg-background text-foreground fixed p-6 transition-all backdrop:brightness-50 backdrop:backdrop-blur-xs',
    'data-open:animate-in data-closing:animate-out data-closing:duration-300 data-open:duration-300',
    'data-open:backdrop:animate-in data-closing:backdrop:animate-out data-closing:backdrop:fade-out data-open:backdrop:fade-in data-closing:backdrop:duration-300 data-open:backdrop:duration-300',
  ],
  {
    variants: {
      position: {
        center:
          'rounded-base data-closed:fade-out data-open:fade-in data-closed:zoom-out-95 data-open:zoom-in-95 data-open:slide-in-from-bottom-2 data-closing:backdrop:fade-out data-open:backdrop:fade-in max-w-lg shadow-lg',
        top: 'rounded-b-base data-closing:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 mt-0 mb-auto border-b',
        bottom:
          'rounded-t-base data-closing:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 mt-auto mb-0 border-t',
        left: 'rounded-r-base data-closing:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 mr-auto ml-0 h-full max-w-sm border-r',
        right:
          'rounded-l-base data-closing:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 mr-0 ml-auto h-full max-w-sm border-l',
      },
    },
    defaultVariants: {
      position: 'center',
    },
  },
);

type PanelProps = PropsOf<typeof HeadlessModal.Panel> &
  VariantProps<typeof panelVariants>;

const Panel = component$<PanelProps>(({ position, ...props }) => {
  return (
    <HeadlessModal.Panel {...props} class={cn(panelVariants({ position }), props.class)}>
      <Slot />
    </HeadlessModal.Panel>
  );
});

const Title = component$<PropsOf<'h2'>>(({ ...props }) => {
  return (
    <HeadlessModal.Title
      {...props}
      class={cn('text-lg font-semibold tracking-tight', props.class)}
    >
      <Slot />
    </HeadlessModal.Title>
  );
});

const Description = component$<PropsOf<'p'>>(({ ...props }) => {
  return (
    <HeadlessModal.Description
      {...props}
      class={cn('text-muted-foreground text-sm', props.class)}
    >
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
