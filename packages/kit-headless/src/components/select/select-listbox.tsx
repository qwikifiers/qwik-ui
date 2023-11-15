import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectListBoxProps = QwikIntrinsicElements['ul'];

export const SelectListBox = component$((props: SelectListBoxProps) => {
  const indexDiffSignal = useSignal<number | undefined>(undefined);
  const listBoxRefSignal = useSignal<HTMLElement>();
  const selectContextSignal = useContext(SelectContextId);
  const prevTimeoutSignal = useSignal<undefined | NodeJS.Timeout>(undefined);
  const inputStrgSignal = useSignal('');
  const fullStrgSearchFailedSignal = useSignal(false);
  selectContextSignal.listBoxRefSig = listBoxRefSignal;

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      const availableOptions = selectContextSignal.optionsStore.filter(
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

      // reset the timer when a key is pressed again
      // reset the inputStrg if the timer runs out
      // w3c uses 500ms, so do we
      if (prevTimeoutSignal.value === undefined) {
        prevTimeoutSignal.value = setTimeout(() => {
          inputStrgSignal.value = '';
        }, 500);
      } else {
        clearTimeout(prevTimeoutSignal.value);
        prevTimeoutSignal.value = setTimeout(() => {
          inputStrgSignal.value = '';
        }, 500);
      }
      // We go into "one char search mode" when:
      // A key is pressed every >500ms cycle
      // The input strg has been confirmed to not exitst & the same key is pressed
      if (inputStrgSignal.value.length < 1 || fullStrgSearchFailedSignal.value) {
        // for perf reasons, it might be better to store charOptions as global state since its mapped through everytime
        const charOptions: Array<string> = availableOptions.map((e) => {
          return e.textContent!.slice(0, 1).toLowerCase();
        });
        const currentChar = e.key.toLowerCase();
        inputStrgSignal.value += currentChar;
        const charIndex = charOptions.indexOf(currentChar);
        if (charIndex !== -1) {
          if (indexDiffSignal.value === undefined) {
            availableOptions[charIndex].focus();
            indexDiffSignal.value = charIndex + 1;
          } else {
            // repeat logic handles looping behavior & if the key changes we open the door for a full strg search again
            const isRepeat = charOptions[indexDiffSignal.value - 1] === currentChar;
            if (isRepeat) {
              const nextChars = charOptions.slice(indexDiffSignal.value);
              const repeatIndex = nextChars.indexOf(currentChar);
              if (repeatIndex !== -1) {
                const nextIndex = repeatIndex + indexDiffSignal.value;
                availableOptions[nextIndex].focus();
                indexDiffSignal.value = nextIndex + 1;
              } else {
                availableOptions[charIndex].focus();
                indexDiffSignal.value = charIndex + 1;
              }
            } else {
              availableOptions[charIndex].focus();
              fullStrgSearchFailedSignal.value = false;
              indexDiffSignal.value = charIndex + 1;
            }
          }
        }
      }
      // if timer has not passed & the fullstrg is unknown, we search for the full strg match
      else {
        // for perf reasons, it might be better to store charOptions as global state since its mapped through everytime
        const strgOptions: Array<string> = availableOptions.map((e) => {
          return e.textContent!.toLowerCase();
        });
        // signals dont update as eagerly as i need them to here
        const searchStrg = inputStrgSignal.value + e.key.toLowerCase();
        const firstPossibleOption = strgOptions.findIndex((e) => {
          const size = searchStrg.length;
          return e.substring(0, size) === searchStrg;
        });
        if (firstPossibleOption !== -1) {
          availableOptions[firstPossibleOption].focus();
          inputStrgSignal.value = searchStrg;
          indexDiffSignal.value = firstPossibleOption + 1;
        } else {
          // clean the timeout of this call to make sure the next time the fn is called it has correct signal val and to not span the user with timeOuts
          clearTimeout(prevTimeoutSignal.value);
          // this makes a "char loop" until a different key is pressed
          fullStrgSearchFailedSignal.value = true;
        }
      }
    }
    listBoxRefSignal.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      listBoxRefSignal.value?.removeEventListener('keydown', keyHandler);
    });
  });
  return (
    <ul
      ref={listBoxRefSignal}
      role="listbox"
      tabIndex={0}
      hidden={!selectContextSignal.isListboxHiddenSig.value}
      style={`
        display: ${selectContextSignal.isOpenSig.value ? 'block' : 'none'};
        position: absolute;
        z-index: 1;
        ${props.style}
      `}
      class={props.class}
    >
      <Slot />
    </ul>
  );
});
