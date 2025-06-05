import { component$, Slot, type PropsOf } from '@builder.io/qwik';
import { Collapsible as HeadlessCollapsible } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = (props: PropsOf<typeof HeadlessCollapsible.Root>) => (
  <HeadlessCollapsible.Root {...props}>{props.children}</HeadlessCollapsible.Root>
);

const Trigger = component$<PropsOf<typeof HeadlessCollapsible.Trigger>>(
  ({ ...props }) => {
    return (
      <HeadlessCollapsible.Trigger {...props}>
        <Slot />
      </HeadlessCollapsible.Trigger>
    );
  },
);

const Content = component$<PropsOf<typeof HeadlessCollapsible.Content>>((props) => {
  return (
    <HeadlessCollapsible.Content {...props} class={cn(props.class)}>
      <Slot />
    </HeadlessCollapsible.Content>
  );
});

export const Collapsible = {
  Root,
  Trigger,
  Content,
};
