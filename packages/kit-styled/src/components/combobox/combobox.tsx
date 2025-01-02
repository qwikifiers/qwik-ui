import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Combobox as HeadlessCombobox } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { LuChevronDown } from '@qwikest/icons/lucide';

const Root = (props: PropsOf<typeof HeadlessCombobox.Root>) => {
  return (
    <HeadlessCombobox.Root
      {...props}
      class={cn(
        'flex h-full w-48 flex-col overflow-hidden bg-popover text-popover-foreground',
        props.class,
      )}
      comboboxItemComponent={Item}
      comboboxItemLabelComponent={ItemLabel}
    >
      {props.children}
    </HeadlessCombobox.Root>
  );
};

const Label = component$<PropsOf<typeof HeadlessCombobox.Label>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Label {...props} class={cn('text-sm', props.class)}>
      <Slot />
    </HeadlessCombobox.Label>
  );
});

const ItemLabel = component$<PropsOf<typeof HeadlessCombobox.ItemLabel>>(
  ({ ...props }) => {
    return (
      <HeadlessCombobox.ItemLabel {...props} class={cn('text-sm', props.class)}>
        <Slot />
      </HeadlessCombobox.ItemLabel>
    );
  },
);

const ItemIndicator = component$<PropsOf<typeof HeadlessCombobox.ItemIndicator>>(
  ({ ...props }) => {
    return (
      <HeadlessCombobox.ItemIndicator {...props} class={cn('text-sm', props.class)}>
        <Slot />
      </HeadlessCombobox.ItemIndicator>
    );
  },
);

const Control = component$<PropsOf<typeof HeadlessCombobox.Control>>((props) => {
  return (
    <HeadlessCombobox.Control
      {...props}
      class={cn('relative flex items-center rounded-base', props.class)}
    >
      <Slot />
    </HeadlessCombobox.Control>
  );
});

const Input = component$<PropsOf<typeof HeadlessCombobox.Input>>((props) => {
  return (
    <HeadlessCombobox.Input
      {...props}
      class={cn(
        'flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
    />
  );
});

const Trigger = component$<PropsOf<typeof HeadlessCombobox.Trigger>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Trigger
      {...props}
      class={cn('group absolute right-0 h-6 w-6', props.class)}
    >
      <LuChevronDown class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
    </HeadlessCombobox.Trigger>
  );
});

const Popover = component$<PropsOf<typeof HeadlessCombobox.Popover>>((props) => {
  return (
    <HeadlessCombobox.Popover
      {...props}
      class={cn('w-48 rounded-base border bg-background p-2', props.class)}
    >
      <Slot />
    </HeadlessCombobox.Popover>
  );
});

const Item = component$<PropsOf<typeof HeadlessCombobox.Item>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Item
      {...props}
      class={cn(
        'group flex justify-between gap-4 rounded-sm px-2 text-foreground aria-disabled:font-light aria-disabled:text-muted-foreground data-[highlighted]:cursor-pointer data-[highlighted]:bg-accent',
        props.class,
      )}
    >
      <Slot />
    </HeadlessCombobox.Item>
  );
});

const Inline = component$<PropsOf<typeof HeadlessCombobox.Inline>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Inline {...props} class={cn('', props.class)}>
      <Slot />
    </HeadlessCombobox.Inline>
  );
});

const Empty = component$<PropsOf<typeof HeadlessCombobox.Empty>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Empty {...props} class={cn('', props.class)}>
      <Slot />
    </HeadlessCombobox.Empty>
  );
});

export const Combobox = {
  Root,
  Label,
  Control,
  Input,
  Trigger,
  Popover,
  Item,
  ItemLabel,
  ItemIndicator,
  Inline,
  Empty,
};
