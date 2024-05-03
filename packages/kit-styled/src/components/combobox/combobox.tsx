import { Combobox as QwikUICombobox } from '@qwik-ui/headless';

import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuChevronDown } from '@qwikest/icons/lucide';

export const Combobox = component$<PropsOf<typeof QwikUICombobox.Root>>((props) => {
  return (
    <QwikUICombobox.Root
      {...props}
      class={cn(
        'flex h-full w-48 flex-col overflow-hidden bg-popover text-popover-foreground',
        props.class,
      )}
    >
      <Slot />
    </QwikUICombobox.Root>
  );
});

export const ComboboxLabel = component$<PropsOf<typeof QwikUICombobox.Label>>(
  ({ ...props }) => {
    return (
      <QwikUICombobox.Label {...props} class={cn('text-sm', props.class)}>
        <Slot />
      </QwikUICombobox.Label>
    );
  },
);

export const ComboboxControl = component$<PropsOf<typeof QwikUICombobox.Control>>(
  (props) => {
    return (
      <QwikUICombobox.Control
        {...props}
        class={cn('relative flex items-center rounded-base ', props.class)}
      >
        <Slot />
      </QwikUICombobox.Control>
    );
  },
);

export const ComboboxInput = component$<PropsOf<typeof QwikUICombobox.Input>>((props) => {
  return (
    <QwikUICombobox.Input
      {...props}
      class={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent py-3 pl-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
    />
  );
});

export const ComboboxTrigger = component$<PropsOf<typeof QwikUICombobox.Trigger>>(
  ({ ...props }) => {
    return (
      <QwikUICombobox.Trigger
        {...props}
        class={cn('group absolute right-0 h-6 w-6', props.class)}
      >
        <LuChevronDown class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
      </QwikUICombobox.Trigger>
    );
  },
);

export const ComboboxPopover = component$<PropsOf<typeof QwikUICombobox.Popover>>(
  (props) => {
    return (
      <QwikUICombobox.Popover {...props} class={cn('bg-transparent', props.class)}>
        <Slot />
      </QwikUICombobox.Popover>
    );
  },
);

export const ComboboxListbox = component$<PropsOf<typeof QwikUICombobox.Listbox>>(
  ({ ...props }) => {
    return (
      <QwikUICombobox.Listbox
        {...props}
        class={cn('w-48 rounded-base border bg-background p-2', props.class)}
      >
        <Slot />
      </QwikUICombobox.Listbox>
    );
  },
);

export const ComboboxOption = component$<PropsOf<typeof QwikUICombobox.Option>>(
  ({ ...props }) => {
    return (
      <QwikUICombobox.Option
        {...props}
        class={cn(
          'group flex justify-between gap-4 rounded-sm px-2 text-foreground aria-disabled:font-light aria-disabled:text-muted-foreground data-[highlighted]:cursor-pointer data-[highlighted]:bg-accent',
          props.class,
        )}
      >
        <Slot />
      </QwikUICombobox.Option>
    );
  },
);
