import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { Dropdown as HDropdown } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
import { buttonVariants } from '../button/button';
import { VariantProps } from 'class-variance-authority';

type RootProps = PropsOf<typeof HDropdown.Root>;

const Root = (props: RootProps) => {
  return (
    <HDropdown.Root dropdownItemComponent={Item} {...props}>
      {props.children}
    </HDropdown.Root>
  );
};

type TriggerProps = PropsOf<typeof HDropdown.Trigger> &
  VariantProps<typeof buttonVariants>;

const Trigger = component$<TriggerProps>(({ size, look, ...props }) => {
  return (
    <HDropdown.Trigger {...props} class={cn(buttonVariants({ size, look }), props.class)}>
      <Slot />
    </HDropdown.Trigger>
  );
});

type PopoverProps = PropsOf<typeof HDropdown.Popover>;

const Popover = component$((props: PopoverProps) => {
  return (
    <HDropdown.Popover
      {...props}
      class={cn(
        'min-w-32 overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        props.class,
      )}
    >
      <Slot />
    </HDropdown.Popover>
  );
});

type ItemProps = PropsOf<typeof HDropdown.Item> & {
  inset?: boolean;
};

const Item = component$(({ inset, ...props }: ItemProps) => {
  return (
    <HDropdown.Item
      {...props}
      class={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        props.class,
      )}
    >
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
  return (
    <HDropdown.Separator {...props} class={cn('-mx-1 my-1 h-px bg-muted', props.class)} />
  );
});

type GroupProps = PropsOf<typeof HDropdown.Group>;

export const Group = component$((props: GroupProps) => {
  return (
    <HDropdown.Group {...props}>
      <Slot />
    </HDropdown.Group>
  );
});

type GroupLabelProps = PropsOf<typeof HDropdown.GroupLabel> & {
  inset?: boolean;
};

const GroupLabel = component$(({ inset, ...props }: GroupLabelProps) => {
  return (
    <HDropdown.GroupLabel
      {...props}
      class={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)}
    >
      <Slot />
    </HDropdown.GroupLabel>
  );
});

const Shortcut = component$((props: PropsOf<'span'>) => {
  return (
    <span
      {...props}
      class={cn('ml-auto text-xs tracking-widest opacity-60', props.class)}
    >
      <Slot />
    </span>
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
  Shortcut,
};
