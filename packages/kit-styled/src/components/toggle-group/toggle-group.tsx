import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { ToggleGroup as HeadlessToggleGroup } from '@qwik-ui/headless';

import type { VariantProps } from 'class-variance-authority';

import { toggleVariants } from '../toggle/toggle';

type ToggleGroupRootProps = PropsOf<typeof HeadlessToggleGroup.Root>;

const Root = component$<ToggleGroupRootProps>(({ ...props }) => {
  return (
    <HeadlessToggleGroup.Root
      {...props}
      class={cn('flex items-center gap-1', props.class)}
    >
      <Slot />
    </HeadlessToggleGroup.Root>
  );
});

type ToggleGroupItemProps = PropsOf<typeof HeadlessToggleGroup.Item> &
  VariantProps<typeof toggleVariants>;

const Item = component$<ToggleGroupItemProps>(({ size, look, ...props }) => {
  return (
    <HeadlessToggleGroup.Item
      {...props}
      class={cn(toggleVariants({ size, look }), props.class)}
    >
      <Slot />
    </HeadlessToggleGroup.Item>
  );
});

export const ToggleGroup = {
  Root,
  Item,
};
