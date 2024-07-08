import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Select as HeadlessSelect } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

const Root = (props: PropsOf<typeof HeadlessSelect.Root>) => (
  <HeadlessSelect.Root
    {...props}
    selectItemComponent={Item}
    selectItemLabelComponent={ItemLabel}
    selectErrorMessageComponent={ErrorMessage}
  />
);

const Label = component$<PropsOf<typeof HeadlessSelect.Label>>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Label
        {...props}
        class={cn('px-2 py-1.5 text-sm font-semibold', props.class)}
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
        {...props}
        class={cn(
          'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          props.class,
        )}
      >
        <Slot />
        <LuChevronDown class="h-4 w-4 opacity-50" />
      </HeadlessSelect.Trigger>
    </>
  );
});

const DisplayValue = HeadlessSelect.DisplayValue;

const Popover = component$<PropsOf<typeof HeadlessSelect.Popover>>(({ ...props }) => {
  return (
    <>
      <HeadlessSelect.Popover
        {...props}
        class={cn(
          'w-full min-w-32 max-w-[15rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[open]:animate-in data-[closing]:animate-out data-[closing]:fade-out-0 data-[open]:fade-in-0 data-[closing]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )}
      >
        <Slot />
      </HeadlessSelect.Popover>
    </>
  );
});

const Group = HeadlessSelect.Group;

const GroupLabel = HeadlessSelect.GroupLabel;

const ErrorMessage = HeadlessSelect.ErrorMessage;

const Item = component$<PropsOf<typeof HeadlessSelect.Item>>(({ ...props }) => {
  return (
    <HeadlessSelect.Item
      {...props}
      class={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[highlighted]:border-base data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        props.class,
      )}
    >
      <Slot />
    </HeadlessSelect.Item>
  );
});

const ItemIndicator = component$<PropsOf<typeof HeadlessSelect.ItemIndicator>>(
  ({ ...props }) => {
    return (
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <HeadlessSelect.ItemIndicator {...props}>
          <LuCheck class="h-4 w-4" />
        </HeadlessSelect.ItemIndicator>
      </span>
    );
  },
);

const ItemLabel = component$<PropsOf<typeof HeadlessSelect.ItemLabel>>(({ ...props }) => {
  return (
    <HeadlessSelect.ItemLabel {...props}>
      <Slot />
    </HeadlessSelect.ItemLabel>
  );
});

export const Select = {
  Root,
  Label,
  Trigger,
  DisplayValue,
  Popover,
  Group,
  GroupLabel,
  Item,
  ItemIndicator,
  ItemLabel,
  ErrorMessage,
};
