import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => (
  <Tooltip content="Tooltip content">Trigger content</Tooltip>
));
