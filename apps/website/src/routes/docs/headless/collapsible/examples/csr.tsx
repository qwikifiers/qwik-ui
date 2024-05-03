import { component$, useStyles$, useSignal } from '@builder.io/qwik';
import styles from '../snippets/collapsible.css?inline';
import { Collapsible } from '@qwik-ui/headless';
import SVG from './svg';

export default component$(() => {
  useStyles$(styles);
  const isCollapsibleRendered = useSignal(false);

  return (
    <>
      <button onClick$={() => (isCollapsibleRendered.value = true)}>
        Render Collapsible
      </button>
      {isCollapsibleRendered.value && (
        <Collapsible.Root class="collapsible">
          <Collapsible.Trigger class="collapsible-trigger">
            <span>Trigger</span>
            <SVG />
          </Collapsible.Trigger>
          <Collapsible.Content class="collapsible-content collapsible-content-outline ">
            Content
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </>
  );
});
