import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type TabListProps = PropsOf<'div'>;

// List of tabs that can be clicked to show different content.
export const HTabList = component$((props: TabListProps) => {
  return (
    <div role="tablist" {...props}>
      <Slot />
    </div>
  );
});
