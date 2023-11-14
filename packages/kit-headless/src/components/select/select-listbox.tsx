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
  const indexDiff = useSignal<number | undefined>(undefined);
  const listBoxRef = useSignal<HTMLElement>();
  const selectContext = useContext(SelectContextId);
  const prevTimeout = useSignal<undefined | NodeJS.Timeout>(undefined);
  const favStrg = useSignal('');
  const fullStrgSearchFailed = useSignal(false);
  selectContext.listBoxRefSig = listBoxRef;

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
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
      // w3c uses 500ms, for testing purposes is at 1000
      if (prevTimeout.value === undefined) {
        console.log('base case ', favStrg.value);
        prevTimeout.value = setTimeout(() => {
          favStrg.value = '';
        }, 500);
      } else {
        clearTimeout(prevTimeout.value);
        prevTimeout.value = setTimeout(() => {
          favStrg.value = '';
        }, 500);
      }
      //
      if (favStrg.value.length < 1 || fullStrgSearchFailed.value) {
        const charOptions: Array<string> = availableOptions.map((e) => {
          return e.textContent!.slice(0, 1).toLowerCase();
        });
        const currentChar = e.key.toLowerCase();
        favStrg.value += currentChar;
        const charIndex = charOptions.indexOf(currentChar);
        if (charIndex !== -1) {
          if (indexDiff.value === undefined) {
            availableOptions[charIndex].focus();
            indexDiff.value = charIndex + 1;
          } else {
            const isRepeat = charOptions[indexDiff.value - 1] === currentChar;
            if (isRepeat) {
              const nextChars = charOptions.slice(indexDiff.value);
              const repeatIndex = nextChars.indexOf(currentChar);
              if (repeatIndex !== -1) {
                const nextIndex = repeatIndex + indexDiff.value;
                availableOptions[nextIndex].focus();
                indexDiff.value = nextIndex + 1;
              } else {
                availableOptions[charIndex].focus();
                indexDiff.value = charIndex + 1;
              }
            } else {
              availableOptions[charIndex].focus();
              fullStrgSearchFailed.value = false;
              indexDiff.value = charIndex + 1;
            }
          }
        }
      } else {
        // if time has not passed, we search for the full strg match
        const strgOptions: Array<string> = availableOptions.map((e) => {
          return e.textContent!.toLowerCase();
        });
        // signals dont update as eagerly as i need them to here
        const searchStrg = favStrg.value + e.key.toLowerCase();
        const firstPossibleOption = strgOptions.findIndex((e) => {
          const size = searchStrg.length;
          return e.substring(0, size) === searchStrg;
        });
        if (firstPossibleOption !== -1) {
          availableOptions[firstPossibleOption].focus();
          favStrg.value = searchStrg;
          indexDiff.value = firstPossibleOption + 1;
        } else {
          // clean the timeout of this call to make sure the next time the fn is called, it has correct signal val
          clearTimeout(prevTimeout.value);
          fullStrgSearchFailed.value = true;
        }
      }
    }
    listBoxRef.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      listBoxRef.value?.removeEventListener('keydown', keyHandler);
    });
  });
  return (
    <ul
      ref={listBoxRef}
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
    >
      <Slot />
    </ul>
  );
});
