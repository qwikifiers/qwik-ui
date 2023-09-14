import {
  $,
  useSignal,
  useContext,
  component$,
  Slot,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
  useVisibleTask$,
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

import { KeyCode } from '../../utils/key-code.type';

const listPreventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
];

export type ListboxProps = QwikIntrinsicElements['ul'];

export const AutocompleteListbox = component$((props: ListboxProps) => {
  const listboxRefSig = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  const listboxId = contextService.listBoxId;
  const isTriggerExpandedSig = contextService.isTriggerExpandedSig;

  useVisibleTask$(function preventDefaultTask({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      if (listPreventedKeys.includes(e.key as KeyCode)) {
        e.preventDefault();
      }
    }

    listboxRefSig.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      listboxRefSig.value?.removeEventListener('keydown', keyHandler);
    });
  });

  useVisibleTask$(function focusListboxTask({ track }) {
    if (track(() => isTriggerExpandedSig.value)) {
      listboxRefSig.value?.focus();
    }
  });

  useVisibleTask$(function registerListboxRefTask() {
    contextService.listBoxRefSig.value = listboxRefSig.value;
  });

  return (
    <ul
      id={listboxId}
      ref={listboxRefSig}
      style={`
          display: ${
            isTriggerExpandedSig.value ? 'block' : 'none'
          }; position: absolute; z-index: 1; ${props.style}
      `}
      role="listbox"
      {...props}
      // aria-label={!contextService.labelRef.value ? contextService.inputValue.value : undefined}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          const availableOptions = contextService.filteredOptionsStore.map(
            (option) => option.value,
          );

          const target = e.target as HTMLElement;
          const currentIndex = availableOptions.indexOf(target);

          if (e.key === 'ArrowDown') {
            if (currentIndex === availableOptions.length - 1) {
              availableOptions[0]?.focus();
            } else {
              availableOptions[currentIndex + 1]?.focus();
            }
          }

          if (e.key === 'ArrowUp') {
            if (currentIndex <= 0) {
              availableOptions[availableOptions.length - 1]?.focus();
            } else {
              availableOptions[currentIndex - 1]?.focus();
            }
          }

          if (e.key === 'Home') {
            availableOptions[0]?.focus();
          }

          if (e.key === 'End') {
            availableOptions[availableOptions.length - 1]?.focus();
          }
        }),
        props.onKeyDown$,
      ]}
    >
      <Slot />
    </ul>
  );
});
