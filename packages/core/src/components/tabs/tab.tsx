import {component$, Slot} from '@builder.io/qwik';

interface TabProps {
  class?: string;
  className?: string;
  isActive?: boolean;
  isLifted?: boolean;
  isBordered?: boolean;
}

export const Tab = component$(({ isActive, isBordered, isLifted, ...props } : TabProps) => {
  return (
    <a class={`tab ${isActive ? 'tab-active' : ''} ${isBordered ? 'tab-bordered' : ''} ${isLifted ? 'tab-lifted' : ''}`} {...props}>
      <Slot />
    </a>
  );
});
