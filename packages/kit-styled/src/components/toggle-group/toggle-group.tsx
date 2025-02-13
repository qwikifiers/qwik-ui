import {
  component$,
  type PropsOf,
  Slot,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { ToggleGroup as HeadlessToggleGroup } from '@qwik-ui/headless';

import type { VariantProps } from 'class-variance-authority';

import { createContextId } from '@builder.io/qwik';
import { toggleVariants } from '../toggle/toggle';

export const toggleGroupStyledContextId = createContextId<ToggleGroupStyledContext>(
  'qui-toggle-group-styled',
);

export type ToggleGroupStyledContext = VariantProps<typeof toggleVariants>;

type ToggleGroupRootProps = PropsOf<typeof HeadlessToggleGroup.Root> &
  VariantProps<typeof toggleVariants>;

const Root = component$<ToggleGroupRootProps>(({ size, look, ...props }) => {
  const contextStyled: ToggleGroupStyledContext = {
    size,
    look,
  };
  useContextProvider(toggleGroupStyledContextId, contextStyled);

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

const Item = component$<ToggleGroupItemProps>(({ ...props }) => {
  const { size, look } = useContext(toggleGroupStyledContextId);

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
