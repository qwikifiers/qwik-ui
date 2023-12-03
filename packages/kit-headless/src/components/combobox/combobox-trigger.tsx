import {
  Slot,
  component$,
  useContext,
  $,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';
import { PopoverTrigger } from '../popover';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$((props: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);
  const listboxId = `${context.localId}-listbox`;

  return (
    <PopoverTrigger
      {...props}
      ref={context.triggerRef}
      onMouseDown$={[
        $(() => {
          context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
        }),
        props.onMouseDown$,
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
    </PopoverTrigger>
  );
});
