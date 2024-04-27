import { useContext, useSignal, $, useComputed$, Signal } from '@builder.io/qwik';
import SelectContextId from './select-context';
import { Opt } from './select-inline';

/**
 * Helper functions go inside of hooks.
 * This is because outside of the component$ boundary Qwik core wakes up.
 */
export function useSelect() {
  const toggleIndex$ = $(
    (selectedIndexesSig: Signal<Array<number | null>>, index: number | null) => {
      if (index === null) return;

      const currentIndex = selectedIndexesSig.value.indexOf(index);
      if (currentIndex === -1) {
        // Index not found, add it
        selectedIndexesSig.value = [...selectedIndexesSig.value, index];
      } else {
        // Index found, remove it
        selectedIndexesSig.value = [
          ...selectedIndexesSig.value.slice(0, currentIndex),
          ...selectedIndexesSig.value.slice(currentIndex + 1),
        ];
      }
    },
  );

  const getNextEnabledOptionIndex = $((index: number, options: Opt[], loop: boolean) => {
    let offset = 1;
    const len = options.length;

    if (!loop && index + 1 >= len) {
      return index;
    }

    while (offset < len) {
      const nextIndex = (index + offset) % len;
      if (!options[nextIndex].isDisabled) {
        return nextIndex;
      }
      offset++;
      if (!loop && index + offset >= len) {
        break;
      }
    }

    return index;
  });

  const getPrevEnabledOptionIndex = $((index: number, options: Opt[], loop: boolean) => {
    let offset = 1;
    const len = options.length;

    if (!loop && index - 1 < 0) {
      return index;
    }

    while (offset <= len) {
      const prevIndex = (index - offset + len) % len;
      if (!options[prevIndex].isDisabled) {
        return prevIndex;
      }
      offset++;
      if (!loop && index - offset < 0) {
        break;
      }
    }

    return index;
  });

  const getActiveDescendant = $((index: number, options: Opt[], localId: string) => {
    const option = options[index];

    if (index === -1 || option?.isDisabled) {
      return '';
    }

    return `${localId}-${index}`;
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

  const firstCharOptionsSig = useComputed$(() => {
    return context.optionsSig.value.map((opt) =>
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
      const firstCharIndex = firstCharOptionsSig.value.indexOf(singleInputChar);

      if (firstCharIndex === -1 || firstCharIndex === undefined) {
        return null;
      }
      if (indexDiffSig.value === undefined) {
        indexDiffSig.value = firstCharIndex + 1;
        context.highlightedIndexSig.value = firstCharIndex;

        if (!context.isListboxOpenSig.value) {
          context.selectedIndexesSig.value = [firstCharIndex];
        }

        return;
      }

      // If the same character is typed in succession, visual focus cycles among the options starting with that character.

      const prevIndex = indexDiffSig.value - 1;

      const isRepeatedChar = firstCharOptionsSig.value[prevIndex] === key;

      if (isRepeatedChar) {
        // Slices the options' first characters from indexDiffSig.value for finding the next matching character.
        const nextCharSearch = firstCharOptionsSig.value.slice(indexDiffSig.value);

        // index the next time we could see the same character
        const repeatIndex = nextCharSearch.indexOf(key);
        if (repeatIndex !== -1) {
          const nextIndex = repeatIndex + indexDiffSig.value;

          context.highlightedIndexSig.value = nextIndex;
          if (!context.isListboxOpenSig.value) {
            context.selectedIndexesSig.value = [nextIndex];
          }
          indexDiffSig.value = nextIndex + 1;
          return;
        }

        indexDiffSig.value = undefined;
        context.highlightedIndexSig.value = firstCharIndex;
        if (!context.isListboxOpenSig.value) {
          context.selectedIndexesSig.value = [firstCharIndex];
        }
        return;
      }
      indexDiffSig.value = firstCharIndex + 1;
      context.highlightedIndexSig.value = firstCharIndex;
      if (!context.isListboxOpenSig.value) {
        context.selectedIndexesSig.value = [firstCharIndex];
      }

      return;
    });

    const multipleChars$ = $(() => {
      // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
      clearTimeout(prevTimeoutSig.value);
      prevTimeoutSig.value = setTimeout(() => {
        inputStrSig.value = '';
      }, 1000);

      const firstPossibleOpt = context.optionsSig.value.findIndex((opt) => {
        const size = inputStrSig.value.length;
        const optStr = opt.displayValue?.toLowerCase();
        return optStr?.substring(0, size) === inputStrSig.value;
      });
      if (firstPossibleOpt !== -1) {
        context.highlightedIndexSig.value = firstPossibleOpt;
        if (!context.isListboxOpenSig.value) {
          context.selectedIndexesSig.value = [firstPossibleOpt];
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
