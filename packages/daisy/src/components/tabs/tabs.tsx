import {component$, Slot} from '@builder.io/qwik';

interface TabsProps {
  class?: string;
  className?: string;
  boxed?: boolean;
}

export const Tabs = component$(({ boxed = false, ...props } : TabsProps) => {
  return (
    <div class={`tabs ${boxed ? 'tabs-boxed' : ''}`} {...props}>
      <Slot />
    </div>
  );
});
