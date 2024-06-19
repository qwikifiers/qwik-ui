import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Combobox as HeadlessCombobox } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { LuChevronDown } from '@qwikest/icons/lucide';

const Root = component$<PropsOf<typeof HeadlessCombobox.Root>>((props) => {
  return (
    <HeadlessCombobox.Root
      {...props}
      class={cn(
        'flex h-full w-48 flex-col overflow-hidden bg-popover text-popover-foreground',
        props.class,
      )}
    >
      <Slot />
    </HeadlessCombobox.Root>
  );
});

const Label = component$<PropsOf<typeof HeadlessCombobox.Label>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Label {...props} class={cn('text-sm', props.class)}>
      <Slot />
    </HeadlessCombobox.Label>
  );
});

const Control = component$<PropsOf<typeof HeadlessCombobox.Hub>>((props) => {
  return (
    <HeadlessCombobox.Hub
      {...props}
      class={cn('relative flex items-center rounded-base ', props.class)}
    >
      <Slot />
    </HeadlessCombobox.Hub>
  );
});

const Input = component$<PropsOf<typeof HeadlessCombobox.Input>>((props) => {
  return (
    <HeadlessCombobox.Input
      {...props}
      class={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent py-3 pl-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
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
    <HeadlessCombobox.Popover {...props} class={cn('bg-transparent', props.class)}>
      <Slot />
    </HeadlessCombobox.Popover>
  );
});

const Listbox = component$<PropsOf<typeof HeadlessCombobox.Listbox>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Listbox
      {...props}
      class={cn('w-48 rounded-base border bg-background p-2', props.class)}
    >
      <Slot />
    </HeadlessCombobox.Listbox>
  );
});

const Option = component$<PropsOf<typeof HeadlessCombobox.Option>>(({ ...props }) => {
  return (
    <HeadlessCombobox.Option
      {...props}
      class={cn(
        'group flex justify-between gap-4 rounded-sm px-2 text-foreground aria-disabled:font-light aria-disabled:text-muted-foreground data-[highlighted]:cursor-pointer data-[highlighted]:bg-accent',
        props.class,
      )}
    >
      <Slot />
    </HeadlessCombobox.Option>
  );
});

export const Combobox = {
  Root,
  Label,
  Control,
  Input,
  Trigger,
  Popover,
  Listbox,
  Option,
};
