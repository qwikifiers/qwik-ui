import { $, useContext, type Signal } from '@builder.io/qwik';
import SelectContextId from './select-context';

export function useSelect() {
  const context = useContext(SelectContextId);

  const getNextEnabledOptionIndex = $((index: number, options: HTMLElement[]) => {
    let offset = 1;
    let currentIndex = index;
    const len = options.length;

    while ((options[(currentIndex + offset) % len] as HTMLOptionElement).disabled) {
      offset++;
      if (offset + currentIndex > len - 1) {
        currentIndex = 0;
        offset = 0;
      }

      // no enabled opt found
      if (offset >= len) {
        return -1;
      }
    }
    return (currentIndex + offset) % len;
  });

  const getPrevEnabledOptionIndex = $((index: number, options: HTMLElement[]) => {
    let offset = 1;
    let currentIndex = index;
    const len = options.length;
    while ((options[(currentIndex + offset) % len] as HTMLOptionElement).disabled) {
      offset++;
      if (currentIndex - offset < 0) {
        currentIndex = len - 1;
        offset = 0;
      }
    }
    return (currentIndex - offset + len) % len;
  });

  const getIntialIndexOnKey = $((key: string): number => {
    // in the future, many options will need to select first option
    // we also might need to filter for disbled items
    const sendFirstOption = ['ArrowDown', 'ArrowUp'];
    const shouldBeFirstOption = sendFirstOption.includes(key);
    if (shouldBeFirstOption) {
      return 0;
    }
    return -1;
  });

  // this is done more inline with how W3C does it, but class could be change for attributes too
  const toggleHiglightClass = $(
    (prevIndex: number, currentIndex: number, elemArr: (HTMLLIElement | undefined)[]) => {
      const currElem = elemArr[currentIndex];
      if (currElem === undefined) {
        return;
      }
      // this should be passed as prop
      const className = 'bg-red-500';
      if (prevIndex === -1) {
        currElem.classList.toggle(className);
        return;
      }
      const prevElem = elemArr[prevIndex];
      if (prevElem === undefined) {
        return;
      }
      prevElem.classList.toggle(className);
      currElem.classList.toggle(className);
    },
  );

  // this fn could be replaced by checking in each option instead, just went for W3C
  const manageToggle = $(
    (
      currentIndex: number,
      indexSig: Signal<number>,
      elemArr: (HTMLLIElement | undefined)[],
    ) => {
      const prevIndex = indexSig.value;
      toggleHiglightClass(prevIndex, currentIndex, elemArr);
      indexSig.value = currentIndex;
    },
  );

  const setTriggerText = $(
    (indexSig: Signal<number>, elemArr: (HTMLLIElement | undefined)[]) => {
      const highlightElem = elemArr[indexSig.value];
      const strg = highlightElem!.innerText;
      context.triggerRef.value!.innerText = strg;
    },
  );

  const singleCharSearch = $(
    (
      char: string,
      deltaIndex: Signal<number>,
      elemArr: (HTMLLIElement | undefined)[],
    ): number => {
      const availableOptions = elemArr.filter(
        (option) => !(option?.getAttribute('aria-disabled') === 'true'),
      );
      if (availableOptions[0] === undefined) {
        console.log('undefined');

        return -1;
      }
      const charOptions = availableOptions.map((e) => {
        return e!.textContent!.slice(0, 1).toLowerCase();
      });
      const charIndex = charOptions.indexOf(char);

      if (charIndex === -1) {
        return -1;
      }
      if (deltaIndex.value === -1) {
        const elemIndex = elemArr.indexOf(availableOptions[charIndex]);
        deltaIndex.value = elemIndex + 1;
        return elemIndex;
      }
      const isRepeat = charOptions[deltaIndex.value - 1] === char;

      if (isRepeat) {
        const nextChars = charOptions.slice(deltaIndex.value);
        const repeatIndex = nextChars.indexOf(char);
        if (repeatIndex !== -1) {
          const nextIndex = repeatIndex + deltaIndex.value;
          const nextElem = availableOptions[nextIndex];
          const nextElemIndex = elemArr.indexOf(nextElem);
          deltaIndex.value = nextIndex + 1;
          return nextElemIndex;
        }
        const elemIndex = elemArr.indexOf(availableOptions[charIndex]);
        deltaIndex.value = elemIndex + 1;
        return elemIndex;
      }
      const elemIndex = elemArr.indexOf(availableOptions[charIndex]);
      deltaIndex.value = elemIndex + 1;
      return elemIndex;
    },
  );

  return {
    getNextEnabledOptionIndex,
    getPrevEnabledOptionIndex,
    getIntialIndexOnKey,
    manageToggle,
    setTriggerText,
    singleCharSearch,
  };
}
