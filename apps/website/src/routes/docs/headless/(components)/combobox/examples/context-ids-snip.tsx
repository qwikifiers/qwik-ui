import { component$ } from '@builder.io/qwik';
import { ComboboxPortal } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <ComboboxPortal /* contextIds={['my-context-id', 'my-context-id-2']} */>
      <></>
    </ComboboxPortal>
  );
});
