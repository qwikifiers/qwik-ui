import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { Dropdown as HDropdown } from '@qwik-ui/headless';

type RootProps = PropsOf<typeof HDropdown.Root>;

const Root = (props: RootProps) => {
  return (
    <HDropdown.Root dropdownItemComponent={Item} {...props}>
      {props.children}
    </HDropdown.Root>
  );
};

type TriggerProps = PropsOf<typeof HDropdown.Trigger>;

const Trigger = component$((props: TriggerProps) => {
  return (
    <HDropdown.Trigger {...props}>
      <Slot />
    </HDropdown.Trigger>
  );
});

type PopoverProps = PropsOf<typeof HDropdown.Popover>;

const Popover = component$((props: PopoverProps) => {
  return (
    <HDropdown.Popover {...props}>
      <Slot />
    </HDropdown.Popover>
  );
});

type ItemProps = PropsOf<typeof HDropdown.Item>;

const Item = component$(({ ...props }: ItemProps) => {
  return (
    <HDropdown.Item {...props}>
      <Slot />
    </HDropdown.Item>
  );
});

type ItemIndicatorProps = PropsOf<typeof HDropdown.ItemIndicator>;

const ItemIndicator = component$((props: ItemIndicatorProps) => {
  return (
    <HDropdown.ItemIndicator {...props}>
      <Slot />
    </HDropdown.ItemIndicator>
  );
});

type SeparatorProps = PropsOf<typeof HDropdown.Separator>;

const Separator = component$((props: SeparatorProps) => {
  return <HDropdown.Separator {...props} />;
});

type GroupProps = PropsOf<typeof HDropdown.Group>;

export const Group = component$((props: GroupProps) => {
  return (
    <HDropdown.Group {...props}>
      <Slot />
    </HDropdown.Group>
  );
});

type GroupLabelProps = PropsOf<typeof HDropdown.GroupLabel>;

const GroupLabel = component$((props: GroupLabelProps) => {
  return (
    <HDropdown.GroupLabel {...props}>
      <Slot />
    </HDropdown.GroupLabel>
  );
});

export const Dropdown = {
  Root,
  Trigger,
  Popover,
  Separator,
  Item,
  ItemIndicator,
  Group,
  GroupLabel,
};
