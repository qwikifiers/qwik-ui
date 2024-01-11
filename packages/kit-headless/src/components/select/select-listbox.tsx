import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';
import { getNextEnabledOptionIndex, getPrevEnabledOptionIndex } from '../combobox/utils';

export type SelectListBoxProps = QwikIntrinsicElements['ul'];

export const SelectListBox = component$((props: SelectListBoxProps) => {
  const indexDiffSignal = useSignal<number | undefined>(undefined);
  const prevTimeoutSignal = useSignal<undefined | NodeJS.Timeout>(undefined);
  const inputStrgSignal = useSignal('');
  const fullStrgSearchFailedSignal = useSignal(false);
  const selectContext = useContext(SelectContextId);
  return (
    <ul
      ref={selectContext.listboxRef}
      role="listbox"
      tabIndex={0}
      hidden={!selectContext.isListboxHiddenSig.value}
      style={`
        display: ${selectContext.isOpenSig.value ? 'block' : 'none'};
        position: absolute;
        z-index: 1;
        ${props.style}
      `}
      class={props.class}
      onKeyDown$={(e) => {
        console.log('this le key ', e.key, selectContext.isOpenSig.value);
        const availableOptions = selectContext.optionsStore.filter(
          (option) => !(option?.getAttribute('aria-disabled') === 'true'),
        );
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
          const nextEnabledOptionIndex = getNextEnabledOptionIndex(
            selectContext.ariaSelectedIndex.value,
            { value: availableOptions },
          );
          console.log(
            'im next ',
            nextEnabledOptionIndex,
            selectContext.ariaSelectedIndex.value,
          );
          selectContext.ariaSelectedIndex.value = nextEnabledOptionIndex;
          if (currentIndex === availableOptions.length - 1) {
            // availableOptions[0]?.focus();
          } else {
            // availableOptions[currentIndex + 1]?.focus();
          }
        }

        if (e.key === 'ArrowUp') {
          const prevEnabledOptionIndex = getPrevEnabledOptionIndex(
            selectContext.ariaSelectedIndex.value,
            { value: availableOptions },
          );
          selectContext.ariaSelectedIndex.value = prevEnabledOptionIndex;

          // if (currentIndex <= 0) {
          //   // availableOptions[availableOptions.length - 1]?.focus();
          // } else {
          //   // availableOptions[currentIndex - 1]?.focus();
          // }
        }
        if (e.key === 'Enter' || e.key === ' ') {
          selectContext.isOpenSig.value = false;
          const idx = selectContext.ariaSelectedIndex.value;
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
              selectContext.ariaSelectedIndex.value = charIndex;
              indexDiffSignal.value = charIndex + 1;
            } else {
              const isRepeat = charOptions[indexDiffSignal.value - 1] === currentChar;
              if (isRepeat) {
                const nextChars = charOptions.slice(indexDiffSignal.value);
                const repeatIndex = nextChars.indexOf(currentChar);
                if (repeatIndex !== -1) {
                  const nextIndex = repeatIndex + indexDiffSignal.value;
                  selectContext.ariaSelectedIndex.value = nextIndex;
                  indexDiffSignal.value = nextIndex + 1;
                } else {
                  selectContext.ariaSelectedIndex.value = charIndex;
                  indexDiffSignal.value = charIndex + 1;
                }
              } else {
                selectContext.ariaSelectedIndex.value = charIndex;
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
            selectContext.ariaSelectedIndex.value = firstPossibleOptIndex;
            inputStrgSignal.value = searchStrg;
            indexDiffSignal.value = firstPossibleOptIndex + 1;
          } else {
            clearTimeout(prevTimeoutSignal.value);
            fullStrgSearchFailedSignal.value = true;
          }
        }
      }}
    >
      <Slot />
    </ul>
  );
});
