import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type TabListProps = QwikIntrinsicElements['div'];

// List of tabs that can be clicked to show different content.
export const TabList = component$((props: TabListProps) => {
  return (
    <div role="tablist" {...props}>
      <Slot />
    </div>
  );
});
