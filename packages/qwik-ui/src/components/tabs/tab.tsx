import {component$, Slot} from '@builder.io/qwik';

interface TabProps {
  class?: string;
  className?: string;
  isActive?: boolean;
}

export const Tab = component$(({ isActive, ...props } : TabProps) => {
  return (
    <a class={`tab ${isActive ? 'tab-active' : ''}`} {...props}>
      <Slot />
    </a>
  );
});
