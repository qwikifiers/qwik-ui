import { useContext, useSignal, $, useComputed$, Signal } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { TOptionsMap } from './select-root';

/**
 * Helper functions go inside of hooks.
 * This is because outside of the component$ boundary Qwik core wakes up.
 */
export function useSelect() {
  const context = useContext(SelectContextId);

  const toggleIndex$ = $(
    async (
      selectedIndexSetSig: Signal<Set<number>>,
      index: number | null,
      itemsMapSig: Signal<TOptionsMap>,
    ) => {
      if (index === null) return;

      // Check if the current index is disabled, and if so, find the next enabled index
      const currItem = itemsMapSig.value.get(index);

      const enabledIndex =
        currItem && currItem.disabled ? await getNextEnabledOptionIndex(index) : index;

      if (selectedIndexSetSig.value.has(enabledIndex)) {
        selectedIndexSetSig.value.delete(enabledIndex);
      } else {
        selectedIndexSetSig.value.add(enabledIndex);
      }
    },
  );

  const getNextEnabledOptionIndex = $((index: number) => {
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

  const getPrevEnabledOptionIndex = $((index: number) => {
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

  const getActiveDescendant = $((index: number) => {
    if (index === -1 || context.itemsMapSig.value.get(index)?.disabled) {
      return '';
    }

    return `${context.localId}-${index}`;
  });

  return {
    getNextEnabledOptionIndex,
    getPrevEnabledOptionIndex,
    getActiveDescendant,
    toggleIndex$,
  };
}

export function useTypeahead() {
  const context = useContext(SelectContextId);
  const inputStrSig = useSignal('');
  const indexDiffSig = useSignal<number | undefined>(undefined);
  const prevTimeoutSig = useSignal<undefined | NodeJS.Timeout>(undefined);

  const firstCharItemSig = useComputed$(() => {
    return Array.from(context.itemsMapSig.value.values()).map((opt) =>
      opt.displayValue?.slice(0, 1).toLowerCase(),
    );
  });

  const typeahead$ = $((key: string): void => {
    inputStrSig.value += key;
    if (key.length > 1) {
      return;
    }

    const firstCharOnly$ = $(() => {
      // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
      const singleInputChar = key.toLowerCase();

      // index the first time we see the same character
      const firstCharIndex = firstCharItemSig.value.indexOf(singleInputChar);

      if (firstCharIndex === -1 || firstCharIndex === undefined) {
        return null;
      }
      if (indexDiffSig.value === undefined) {
        indexDiffSig.value = firstCharIndex + 1;
        context.highlightedIndexSig.value = firstCharIndex;

        if (!context.isListboxOpenSig.value) {
          context.selectedIndexSetSig.value = new Set([firstCharIndex]);
        }

        return;
      }

      // If the same character is typed in succession, visual focus cycles among the options starting with that character.

      const prevIndex = indexDiffSig.value - 1;

      const isRepeatedChar = firstCharItemSig.value[prevIndex] === key;

      if (isRepeatedChar) {
        // Slices the options' first characters from indexDiffSig.value for finding the next matching character.
        const nextCharSearch = firstCharItemSig.value.slice(indexDiffSig.value);

        // index the next time we could see the same character
        const repeatIndex = nextCharSearch.indexOf(key);
        if (repeatIndex !== -1) {
          const nextIndex = repeatIndex + indexDiffSig.value;

          context.highlightedIndexSig.value = nextIndex;
          if (!context.isListboxOpenSig.value) {
            context.selectedIndexSetSig.value = new Set([nextIndex]);
          }
          indexDiffSig.value = nextIndex + 1;
          return;
        }

        indexDiffSig.value = undefined;
        context.highlightedIndexSig.value = firstCharIndex;
        if (!context.isListboxOpenSig.value) {
          context.selectedIndexSetSig.value = new Set([firstCharIndex]);
        }
        return;
      }
      indexDiffSig.value = firstCharIndex + 1;
      context.highlightedIndexSig.value = firstCharIndex;
      if (!context.isListboxOpenSig.value) {
        context.selectedIndexSetSig.value = new Set([firstCharIndex]);
      }

      return;
    });

    const multipleChars$ = $(() => {
      // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
      clearTimeout(prevTimeoutSig.value);
      prevTimeoutSig.value = setTimeout(() => {
        inputStrSig.value = '';
      }, 1000);

      let firstPossibleOpt = -1;
      const inputSize = inputStrSig.value.length;
      const inputStrLower = inputStrSig.value.toLowerCase();

      for (const [index, item] of context.itemsMapSig.value) {
        const optStr = item.displayValue?.toLowerCase().substring(0, inputSize);
        if (optStr === inputStrLower) {
          firstPossibleOpt = index;
          break;
        }
      }

      if (firstPossibleOpt !== -1) {
        context.highlightedIndexSig.value = firstPossibleOpt;
        if (!context.isListboxOpenSig.value) {
          context.selectedIndexSetSig.value = new Set([firstPossibleOpt]);
        }
        return;
      }
      inputStrSig.value = key;
      firstCharOnly$();
    });

    if (inputStrSig.value.length === 1) {
      firstCharOnly$();
      return;
    }

    multipleChars$();
  });

  return { typeahead$ };
}
