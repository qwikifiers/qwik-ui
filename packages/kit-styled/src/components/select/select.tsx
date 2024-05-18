import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Select as HeadlessSelect } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { LuCheck, LuFilter } from '@qwikest/icons/lucide';

const Root = HeadlessSelect.Root;

const Label = component$<PropsOf<typeof HeadlessSelect.Label>>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Label
        class={cn('px-2 py-1.5 text-sm font-semibold', props.class)}
        {...props}
      >
        <Slot />
      </HeadlessSelect.Label>
    </>
  );
});

const Trigger = component$<PropsOf<typeof HeadlessSelect.Trigger>>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Trigger
        class={cn(
          'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          props.class,
          { ...props },
        )}
      >
        <Slot />
        <LuFilter class="h-4 w-4 opacity-50" />
      </HeadlessSelect.Trigger>
    </>
  );
});

const DisplayText = HeadlessSelect.DisplayText;

const Popover = component$<PropsOf<typeof HeadlessSelect.Popover>>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Popover
        class={cn(
          'w-full max-w-[15rem]',
          // 'overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
          props.class,
        )}
        {...props}
      >
        <Slot />
      </HeadlessSelect.Popover>
    </>
  );
});

type ListboxProps = PropsOf<typeof HeadlessSelect.Listbox>;
const Listbox = component$<ListboxProps>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Listbox
        class={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )}
        {...props}
      >
        <Slot />
      </HeadlessSelect.Listbox>
    </>
  );
});

const Group = HeadlessSelect.Group;

const GroupLabel = HeadlessSelect.GroupLabel;

const Item = component$<PropsOf<typeof HeadlessSelect.Item>>(({ ...props }) => {
  return (
    <HeadlessSelect.Item
      class={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )}
    >
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <HeadlessSelect.ItemIndicator>
          <LuCheck class="h-4 w-4" />
        </HeadlessSelect.ItemIndicator>
      </span>
      <HeadlessSelect.ItemLabel>
        <Slot />
      </HeadlessSelect.ItemLabel>
    </HeadlessSelect.Item>
  );
});

export const Select = {
  Root,
  Label,
  Trigger,
  DisplayText,
  Popover,
  Listbox,
  Group,
  GroupLabel,
  Item,
};
