import { component$, useStyles$, useSignal, $ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';
import SVG from './svg';

export default component$(() => {
  useStyles$(styles);
  const count = useSignal<number>(0);

  const handleOpenChange$ = $((open: boolean) => {
    if (open) {
      count.value++;
    }
  });

  return (
    <Collapsible class="collapsible" onOpenChange$={handleOpenChange$}>
      <CollapsibleTrigger class="collapsible-trigger">
        <span>Trigger</span>
        <SVG />
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible-content collapsible-content-outline ">
        Content: {count.value}
      </CollapsibleContent>
    </Collapsible>
  );
});
