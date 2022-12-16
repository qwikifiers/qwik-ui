import { component$, PropFunction, Slot } from '@builder.io/qwik';
import { Tab as HeadlessTab } from '@qwik-ui/headless';

interface TabProps {
  class?: string;
  className?: string;
  isActive?: boolean;
  isLifted?: boolean;
  isBordered?: boolean;
  onClick$?: PropFunction<(clicked: number) => void>;
}

export const Tab = component$(
  ({ isActive, isBordered, isLifted, onClick$, ...props }: TabProps) => {
    return (
      <HeadlessTab
        onClick={onClick$}
        class={`tab ${isActive ? 'tab-active' : ''} ${
          isBordered ? 'tab-bordered' : ''
        } ${isLifted ? 'tab-lifted' : ''}`}
        {...props}
      >
        <Slot />
      </HeadlessTab>
    );
  }
);
