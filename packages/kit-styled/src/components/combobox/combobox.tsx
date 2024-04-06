import {
  Combobox as QwikUICombobox,
  ComboboxControl as QwikUIComboboxControl,
  ComboboxInput as QwikUIComboboxInput,
  ComboboxLabel as QwikUIComboboxLabel,
  ComboboxListbox as QwikUIComboboxListbox,
  ComboboxOption as QwikUIComboboxOption,
  ComboboxPopover as QwikUIComboboxPopover,
  ComboboxTrigger as QwikUIComboboxTrigger,
} from '@qwik-ui/headless';

import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuChevronDown } from '@qwikest/icons/lucide';

export const Combobox = component$<PropsOf<typeof QwikUICombobox>>((props) => {
  return (
    <QwikUICombobox
      {...props}
      class={cn(
        'flex h-full w-48 flex-col overflow-hidden bg-popover text-popover-foreground',
        props.class,
      )}
    >
      <Slot />
    </QwikUICombobox>
  );
});

export const ComboboxLabel = component$<PropsOf<typeof QwikUIComboboxLabel>>(
  ({ ...props }) => {
    return (
      <QwikUIComboboxLabel {...props} class={cn('text-sm', props.class)}>
        <Slot />
      </QwikUIComboboxLabel>
    );
  },
);

export const ComboboxControl = component$<PropsOf<typeof QwikUIComboboxControl>>(
  (props) => {
    return (
      <QwikUIComboboxControl
        {...props}
        class={cn('relative flex items-center rounded-base ', props.class)}
      >
        <Slot />
      </QwikUIComboboxControl>
    );
  },
);

export const ComboboxInput = component$<PropsOf<typeof QwikUIComboboxInput>>((props) => {
  return (
    <QwikUIComboboxInput
      {...props}
      class={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent py-3 pl-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
    />
  );
});

export const ComboboxTrigger = component$<PropsOf<typeof QwikUIComboboxTrigger>>(
  ({ ...props }) => {
    return (
      <QwikUIComboboxTrigger
        {...props}
        class={cn('group absolute right-0 h-6 w-6', props.class)}
      >
        <LuChevronDown class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
      </QwikUIComboboxTrigger>
    );
  },
);

export const ComboboxPopover = component$<PropsOf<typeof QwikUIComboboxPopover>>(
  (props) => {
    return (
      <QwikUIComboboxPopover {...props} class={cn('bg-transparent', props.class)}>
        <Slot />
      </QwikUIComboboxPopover>
    );
  },
);

export const ComboboxListbox = component$<PropsOf<typeof QwikUIComboboxListbox>>(
  ({ ...props }) => {
    return (
      <QwikUIComboboxListbox
        {...props}
        class={cn('w-48 rounded-base border bg-background p-2', props.class)}
      >
        <Slot />
      </QwikUIComboboxListbox>
    );
  },
);

export const ComboboxOption = component$<PropsOf<typeof QwikUIComboboxOption>>(
  ({ ...props }) => {
    return (
      <QwikUIComboboxOption
        {...props}
        class={cn(
          'group flex justify-between gap-4 rounded-sm px-2 text-foreground aria-disabled:font-light aria-disabled:text-muted-foreground data-[highlighted]:cursor-pointer data-[highlighted]:bg-accent',
          props.class,
        )}
      >
        <Slot />
      </QwikUIComboboxOption>
    );
  },
);
