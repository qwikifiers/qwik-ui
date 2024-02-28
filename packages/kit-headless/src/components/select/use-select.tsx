import { useContext, useSignal, $, useComputed$ } from '@builder.io/qwik';
import SelectContextId from './select-context';

export function useTypeahead() {
  const context = useContext(SelectContextId);
  const inputStrSig = useSignal('');
  const indexDiffSig = useSignal<number | undefined>(undefined);
  const prevTimeoutSig = useSignal<undefined | NodeJS.Timeout>(undefined);
  console.log(inputStrSig.value, indexDiffSig.value, prevTimeoutSig.value);

  const firstCharOptionsSig = useComputed$(() => {
    return context.optionsSig.value.map((opt) => opt.value.slice(0, 1).toLowerCase());
  });
  const fullStrOptionsSig = useComputed$(() => {
    return context.optionsSig.value.map((opt) => opt.value.toLowerCase());
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
        console.log('me first ', repeatIndex, indexDiffSig.value);
        if (repeatIndex !== -1) {
          const nextIndex = repeatIndex + indexDiffSig.value;

          context.highlightedIndexSig.value = nextIndex;
          indexDiffSig.value = nextIndex + 1;
          console.log('me repeats ', nextIndex, indexDiffSig.value);
          return;
        }
        // actual magical return
        return;
      }
      indexDiffSig.value = firstCharIndex + 1;
      context.highlightedIndexSig.value = firstCharIndex;

      return;
    });

    const multipleChars$ = $(() => {
      // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
      clearTimeout(prevTimeoutSig.value);
      prevTimeoutSig.value = setTimeout(() => {
        inputStrSig.value = '';
      }, 1000);

      const firstPossibleOpt = fullStrOptionsSig.value.findIndex((str) => {
        const size = inputStrSig.value.length;
        return str.substring(0, size) === inputStrSig.value;
      });
      if (firstPossibleOpt !== -1) {
        context.highlightedIndexSig.value = firstPossibleOpt;
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
