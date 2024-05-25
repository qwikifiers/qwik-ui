import { component$, useStyles$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Tooltip.Root>
      <Tooltip.Trigger class="tooltip-trigger">Hover over me</Tooltip.Trigger>
      <Tooltip.Content class="tooltip-content">I'm a tooltip!</Tooltip.Content>
    </Tooltip.Root>
  );
});

// internal
import styles from '../snippets/tooltip.css?inline';
