import { useContext, useSignal, $, useComputed$ } from '@builder.io/qwik';
import SelectContextId from './select-context';

export function useTypeahead() {
  const context = useContext(SelectContextId);
  const inputStrSig = useSignal('');
  const indexDiffSig = useSignal<number | undefined>(undefined);
  const prevTimeoutSig = useSignal<undefined | NodeJS.Timeout>(undefined);

  const firstCharOptionsSig = useComputed$(() => {
    return context.optionsSig.value.map((opt) => opt.value.slice(0, 1).toLowerCase());
  });

  const typeahead$ = $((key: string): void => {
    inputStrSig.value += key;
    if (key.length > 1) {
      return;
    }

    inputStrSig.value += key;

    const firstCharOnly$ = $(() => {
      // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
      const singleInputChar = key.toLowerCase();

      const charIndex = firstCharOptionsSig.value.indexOf(singleInputChar);

      if (charIndex === -1 || charIndex === undefined) {
        return null;
      }
      if (indexDiffSig.value === undefined) {
        indexDiffSig.value = charIndex + 1;
        context.highlightedIndexSig.value = charIndex;
        return;
      }

      // If the same character is typed in succession, visual focus cycles among the options starting with that character.
      const isRepeatedChar = firstCharOptionsSig.value[indexDiffSig.value - 1] === key;

      if (isRepeatedChar) {
        const nextChars = firstCharOptionsSig.value.slice(indexDiffSig.value);
        const repeatIndex = nextChars.indexOf(key);
        if (repeatIndex !== -1) {
          const nextIndex = repeatIndex + indexDiffSig.value;

          context.highlightedIndexSig.value = nextIndex;
          indexDiffSig.value = nextIndex + 1;
        }
        return;
      }
      indexDiffSig.value = charIndex + 1;
      context.highlightedIndexSig.value = charIndex;

      return;
    });

    const multipleChars$ = $(() => {
      console.log(inputStrSig.value);

      // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
      clearTimeout(prevTimeoutSig.value);
      prevTimeoutSig.value = setTimeout(() => {
        inputStrSig.value = '';
      }, 1000);
    });

    firstCharOnly$();
    multipleChars$();
  });

  return { typeahead$ };
}
