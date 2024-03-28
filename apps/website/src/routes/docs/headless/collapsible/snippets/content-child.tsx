import { component$ } from '@builder.io/qwik';
import { CollapsibleContent as QUICollapsibleContent } from '@qwik-ui/headless';

export const CollapsibleContent = component$(() => {
  return (
    <QUICollapsibleContent class="collapsible-animation collapsible-content">
      <p class="collapsible-content-outline">Content</p>
    </QUICollapsibleContent>
  );
});
