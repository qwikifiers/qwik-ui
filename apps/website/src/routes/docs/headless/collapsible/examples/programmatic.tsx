import { component$, useSignal } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import './collapsible.css';

export default component$(() => {
  const openSig = useSignal<boolean>(true);

  return (
    <div>
      <p>state: {openSig.value ? 'true' : 'false'}</p>
      <Collapsible bind:isOpen={openSig}>
        <CollapsibleTrigger>I am trigger 1!</CollapsibleTrigger>
        <CollapsibleContent class="collapsible-content">
          I am the content 1!
        </CollapsibleContent>
      </Collapsible>
      <button
        class="rounded-base bg-slate-500 px-2 py-3 text-white"
        onClick$={() => {
          openSig.value = !openSig.value;
        }}
      >
        Programmatic toggle
      </button>
    </div>
  );
});
