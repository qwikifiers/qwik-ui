import { Slot, component$, useContext, $, PropsOf } from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export type ComboboxTriggerProps = PropsOf<'button'>;

export const ComboboxTrigger = component$((props: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);
  const listboxId = `${context.localId}-listbox`;

  return (
    <button
      {...props}
      ref={context.triggerRef}
      onClick$={[
        $(() => {
          context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
        }),
        props.onClick$,
      ]}
      tabIndex={-1}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      popovertarget={listboxId}
      aria-expanded={context.isListboxOpenSig.value}
    >
      <VisuallyHidden>
        Toggle list of
        {context.labelRef.value ? context.labelRef.value?.innerText : 'options'}
      </VisuallyHidden>
      <Slot />
    </button>
  );
});
