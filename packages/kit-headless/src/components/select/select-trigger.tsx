import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';
import {
  getNextEnabledOptionIndexFromDisabledArr,
  getPrevEnabledOptionIndexFromDisabledArr,
} from './utils';

export type SelectTriggerProps = QwikIntrinsicElements['button'];

export const SelectTrigger = component$((props: SelectTriggerProps) => {
  const selectContext = useContext(SelectContextId);
  const triggerRef = useSignal<HTMLElement>();
  const indexDiffSignal = useSignal<number | undefined>(undefined);
  const prevTimeoutSignal = useSignal<undefined | NodeJS.Timeout>(undefined);
  const inputStrgSignal = useSignal('');
  const fullStrgSearchFailedSignal = useSignal(false);
  selectContext.triggerRef = triggerRef;

  useVisibleTask$(function setClickHandler({ cleanup }) {
    function clickHandler(e: Event) {
      e.preventDefault();
      selectContext.isOpenSig.value = !selectContext.isOpenSig.value;
    }
    triggerRef.value?.addEventListener('click', clickHandler);
    cleanup(() => {
      triggerRef.value?.removeEventListener('click', clickHandler);
    });
  });

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      const possibleKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (possibleKeys.indexOf(e.key) !== -1) {
        e.preventDefault();
      }
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === ' '
      ) {
        selectContext.isOpenSig.value = true;
      }
    }
    triggerRef.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      triggerRef.value?.removeEventListener('keydown', keyHandler);
    });
  });

  return (
    <button
      onKeyDown$={(e) => {
        console.log('this le key ', e.key, selectContext.isOpenSig.value);
        const availableOptions = selectContext.optionsStore.filter(
          (option) => !(option?.getAttribute('aria-disabled') === 'true'),
        );
        const disabledArr = selectContext.optionsStore.map((e) => {
          return { disabled: e.getAttribute('aria-disabled') === 'true' };
        });
        console.log('le opts ', disabledArr);

        const target = e.target as HTMLElement;
        const currentIndex = availableOptions.indexOf(target);

        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'Home' ||
          e.key === 'End' ||
          e.key === ' '
        ) {
          e.preventDefault();
        }

        if (e.key === 'ArrowDown') {
          const nextEnabledOptionIndex = getNextEnabledOptionIndexFromDisabledArr(
            selectContext.ariaSelectedIndexSig.value,
            disabledArr,
          );
          console.log(
            'im next ',
            nextEnabledOptionIndex,
            selectContext.ariaSelectedIndexSig.value,
          );
          selectContext.ariaSelectedIndexSig.value = nextEnabledOptionIndex;
          if (currentIndex === availableOptions.length - 1) {
            // availableOptions[0]?.focus();
          } else {
            // availableOptions[currentIndex + 1]?.focus();
          }
        }

        if (e.key === 'ArrowUp') {
          const prevEnabledOptionIndex = getPrevEnabledOptionIndexFromDisabledArr(
            selectContext.ariaSelectedIndexSig.value,
            disabledArr,
          );
          selectContext.ariaSelectedIndexSig.value = prevEnabledOptionIndex;

          // if (currentIndex <= 0) {
          //   // availableOptions[availableOptions.length - 1]?.focus();
          // } else {
          //   // availableOptions[currentIndex - 1]?.focus();
          // }
        }
        if (e.key === 'Home') {
          const firstIndex = disabledArr.findIndex((e) => e.disabled === false);
          selectContext.ariaSelectedIndexSig.value = firstIndex;
        }
        if (e.key === 'End') {
          const firstIndex = disabledArr.findLastIndex((e) => e.disabled === false);
          selectContext.ariaSelectedIndexSig.value = firstIndex;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          selectContext.isOpenSig.value = false;
          const idx = selectContext.ariaSelectedIndexSig.value;
          if (idx === -1) {
            console.log('im a undefined');
            selectContext.isOpenSig.value = false;
            return;
          }

          if (e.key === 'Tab' || e.key === ' ') {
            selectContext.isOpenSig.value = false;
            const idx = selectContext.ariaSelectedIndexSig.value;
            if (idx === -1) {
              console.log('im a undefined');
              selectContext.isOpenSig.value = false;
              return;
            }
            console.log('idk man ', selectContext.optionsStore.length, idx);

            const strg = selectContext.optionsStore[idx].innerText;
            selectContext.selectedOptionSig.value = strg;
            return;
          }
          clearTimeout(prevTimeoutSignal.value);

          prevTimeoutSignal.value = setTimeout(() => {
            inputStrgSignal.value = '';
          }, 500);

          const searchFirstCharOnly =
            inputStrgSignal.value.length < 1 || fullStrgSearchFailedSignal.value;
          if (searchFirstCharOnly) {
            const charOptions: Readonly<string[]> = availableOptions.map((e) => {
              return e.textContent!.slice(0, 1).toLowerCase();
            });
            const currentChar = e.key.toLowerCase();
            if (!fullStrgSearchFailedSignal.value) {
              inputStrgSignal.value += currentChar;
            }
            const charIndex = charOptions.indexOf(currentChar);
            if (charIndex !== -1) {
              if (indexDiffSignal.value === undefined) {
                // availableOptions[charIndex].focus();
                selectContext.ariaSelectedIndexSig.value = charIndex;
                indexDiffSignal.value = charIndex + 1;
              } else {
                const isRepeat = charOptions[indexDiffSignal.value - 1] === currentChar;
                if (isRepeat) {
                  const nextChars = charOptions.slice(indexDiffSignal.value);
                  const repeatIndex = nextChars.indexOf(currentChar);
                  if (repeatIndex !== -1) {
                    const nextIndex = repeatIndex + indexDiffSignal.value;
                    selectContext.ariaSelectedIndexSig.value = nextIndex;
                    indexDiffSignal.value = nextIndex + 1;
                  } else {
                    selectContext.ariaSelectedIndexSig.value = charIndex;
                    indexDiffSignal.value = charIndex + 1;
                  }
                } else {
                  selectContext.ariaSelectedIndexSig.value = charIndex;
                  // bc char has changed, user is typing  a new strg
                  fullStrgSearchFailedSignal.value = false;
                  indexDiffSignal.value = charIndex + 1;
                }
              }
            }
          } else {
            const strgOptions: Readonly<string[]> = availableOptions.map((e) => {
              return e.textContent!.toLowerCase();
            });
            const searchStrg = inputStrgSignal.value + e.key.toLowerCase();
            console.log('over her ', searchStrg);
            const firstPossibleOptIndex = strgOptions.findIndex((e) => {
              const size = searchStrg.length;
              return e.substring(0, size) === searchStrg;
            });
            if (firstPossibleOptIndex !== -1) {
              selectContext.ariaSelectedIndexSig.value = firstPossibleOptIndex;
              inputStrgSignal.value = searchStrg;
              indexDiffSignal.value = firstPossibleOptIndex + 1;
            } else {
              clearTimeout(prevTimeoutSignal.value);
              fullStrgSearchFailedSignal.value = true;
            }
          }
        }
      }}
      ref={triggerRef}
      aria-expanded={selectContext.isOpenSig.value}
      {...props}
    >
      <Slot />
    </button>
  );
});
