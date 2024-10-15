import { $, useContext } from '@builder.io/qwik';

import { dropdownContextId } from './dropdown-context';

/**
 * Helper functions go inside of hooks.
 * This is because outside of the component$ boundary Qwik core wakes up.
 */
export function useDropdown() {
  const context = useContext(dropdownContextId);

  const getNextEnabledItemIndex$ = $((index: number) => {
    let offset = 1;
    const len = context.itemsMapSig.value.size;

    if (!context.loop && index + 1 >= len) {
      return index;
    }

    while (offset < len) {
      const nextIndex = (index + offset) % len;
      if (!context.itemsMapSig.value.get(nextIndex)?.disabled) {
        return nextIndex;
      }
      offset++;
      if (!context.loop && index + offset >= len) {
        break;
      }
    }

    return index;
  });

  const getPrevEnabledItemIndex$ = $((index: number) => {
    let offset = 1;
    const len = context.itemsMapSig.value.size;

    if (!context.loop && index - 1 < 0) {
      return index;
    }

    while (offset <= len) {
      const prevIndex = (index - offset + len) % len;
      if (!context.itemsMapSig.value.get(prevIndex)?.disabled) {
        return prevIndex;
      }
      offset++;
      if (!context.loop && index - offset < 0) {
        break;
      }
    }

    return index;
  });

  return {
    getNextEnabledItemIndex$,
    getPrevEnabledItemIndex$,
  };
}
