import {
  $,
  useSignal,
  useContext,
  component$,
  Slot,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
  useVisibleTask$
} from '@builder.io/qwik';
import AutocompleteContextId from './autocomplete-context-id';

import { KeyCode } from '../../utils/key-code.type';

const preventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp
];

export type ListboxProps = {
  isExpanded?: boolean;
} & QwikIntrinsicElements['ul'];

export const AutocompleteListbox = component$((props: ListboxProps) => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(AutocompleteContextId);
  const listboxId = contextService.listBoxId;
  const listboxElement = ref.value;

  useVisibleTask$(function preventDefaultTask({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      if (preventedKeys.includes(e.key as KeyCode)) {
        e.preventDefault();
      }
    }

    listboxElement?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      listboxElement?.removeEventListener('keydown', keyHandler);
    });
  });

  return (
    <ul
      id={listboxId}
      ref={ref}
      style={`
          display: ${
            contextService.isExpanded.value ? 'block' : 'none'
          }; position: absolute; z-index: 1; ${props.style}
      `}
      role="listbox"
      {...props}
      // aria-label={!contextService.labelRef.value ? contextService.inputValue.value : undefined}
      onKeyDown$={[
        $((e: QwikKeyboardEvent) => {
          const availableOptions = contextService.filteredOptions.map(
            (option) => option.value
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
        props.onKeyDown$
      ]}
    >
      <Slot />
    </ul>
  );
});
