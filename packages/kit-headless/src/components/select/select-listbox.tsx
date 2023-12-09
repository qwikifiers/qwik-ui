import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectListBoxProps = QwikIntrinsicElements['ul'];

export const SelectListBox = component$((props: SelectListBoxProps) => {
  const indexDiffSignal = useSignal<number | undefined>(undefined);
  const prevTimeoutSignal = useSignal<undefined | NodeJS.Timeout>(undefined);
  const inputStrgSignal = useSignal('');
  const fullStrgSearchFailedSignal = useSignal(false);
  const context = useContext(SelectContextId);

  return (
    <ul
      ref={context.listboxRef}
      role="listbox"
      tabIndex={0}
      hidden={!context.isListboxHiddenSig.value}
      style={`
        display: ${context.isOpenSig.value ? 'block' : 'none'};
        position: absolute;
        z-index: 1;
        ${props.style}
      `}
      class={props.class}
      onKeyDown$={(e) => {
        console.log(e.key);
        console.log('do i run on server???');

        const availableOptions = context.optionsStore.filter(
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
              availableOptions[charIndex].focus();
              indexDiffSignal.value = charIndex + 1;
            } else {
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
          const firstPossibleOptIndex = strgOptions.findIndex((e) => {
            const size = searchStrg.length;
            return e.substring(0, size) === searchStrg;
          });
          if (firstPossibleOptIndex !== -1) {
            availableOptions[firstPossibleOptIndex].focus();
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
