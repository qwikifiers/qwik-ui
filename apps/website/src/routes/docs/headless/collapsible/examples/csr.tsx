import { component$, useStyles$, useSignal } from '@builder.io/qwik';
import styles from '../snippets/collapsible.css?inline';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
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
        <Collapsible class="collapsible">
          <CollapsibleTrigger class="collapsible-trigger">
            <span>Trigger</span>
            <SVG />
          </CollapsibleTrigger>
          <CollapsibleContent class="collapsible-content collapsible-content-outline ">
            Content
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
});
