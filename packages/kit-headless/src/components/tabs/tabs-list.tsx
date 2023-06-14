import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Behavior } from './behavior.type';

export type TabListProps = QwikIntrinsicElements['div'] & {
  labelledBy?: string;
  behavior?: Behavior;
};

// List of tabs that can be clicked to show different content.
export const TabList = component$((props: TabListProps) => {
  const { labelledBy, ...rest } = props;

  return (
    <div role="tablist" aria-labelledby={labelledBy} {...rest}>
      <Slot />
    </div>
  );
});
