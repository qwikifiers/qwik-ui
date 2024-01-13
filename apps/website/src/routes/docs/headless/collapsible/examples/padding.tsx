import { component$, useSignal } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import './collapsible.css';

export default component$(() => {
  const openSig = useSignal<boolean>(true);

  return (
    <Collapsible bind:isOpen={openSig}>
      <CollapsibleTrigger>I am trigger 1!</CollapsibleTrigger>
      <CollapsibleContent class="animation p-4">I am the content 1!</CollapsibleContent>
    </Collapsible>
  );
});
