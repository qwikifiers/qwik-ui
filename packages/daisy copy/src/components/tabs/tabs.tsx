import { component$, Slot } from '@builder.io/qwik';
import { Tabs as HeadlessTabs } from '@qwik-ui/headless';

interface TabsProps {
  class?: string;
  boxed?: boolean;
}

export const Tabs = component$(({ boxed = false, ...props }: TabsProps) => {
  return (
    <HeadlessTabs
      behavior="manual"
      class={`tabs ${boxed ? 'tabs-boxed' : ''}`}
      {...props}
    >
      <Slot />
    </HeadlessTabs>
  );
});
