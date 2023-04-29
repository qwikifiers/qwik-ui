import { component$, Slot } from '@builder.io/qwik';
import { TabPanel as HeadlessTabPanel } from '@qwik-ui/headless';

interface TabProps {
  class?: string;
}

export const TabPanel = component$(({ ...props }: TabProps) => {
  return (
    <HeadlessTabPanel {...props}>
      <Slot />
    </HeadlessTabPanel>
  );
});
