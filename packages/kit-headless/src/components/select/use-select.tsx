import { useContext, $ } from '@builder.io/qwik';
import SelectContextId from './select-context';

export function useTypeahead() {
  const context = useContext(SelectContextId);

  const typeahead$ = $((key: string): void => {
    if (key.length > 1) {
      return null;
    }

    const singleInputChar = key.toLowerCase();
    const firstCharOptions = context.optionsSig.value?.map((opt) =>
      opt.value.slice(0, 1).toLowerCase(),
    );

    const charIndex = firstCharOptions.indexOf(singleInputChar);

    if (charIndex === -1) {
      return null;
    }

    context.highlightedIndexSig.value = charIndex;
  });

  return { typeahead$ };
}
