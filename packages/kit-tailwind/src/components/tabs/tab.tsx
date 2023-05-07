import { component$, PropFunction, Slot } from '@builder.io/qwik';
import { Tab as HeadlessTab } from '@qwik-ui/headless';

interface TabProps {
  class?: string;
  isLifted?: boolean;
  isBordered?: boolean;
  onClick$?: PropFunction<(clicked: number) => void>;
}

export const Tab = component$(
  ({ isBordered, isLifted, onClick$, ...props }: TabProps) => {
    return (
      <HeadlessTab
        onClick={onClick$}
        class={`tab ${isBordered ? 'tab-bordered' : ''} ${
          isLifted ? 'tab-lifted' : ''
        }`}
        selectedClassName="tab-active"
        {...props}
      >
        <Slot />
      </HeadlessTab>
    );
  }
);
