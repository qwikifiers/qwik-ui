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
  selectContext.listBoxRefSig = listBoxRef;

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      const availableOptions: Array<HTMLElement> = selectContext.optionsStore.filter(
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

      const charOptions: Array<string> = availableOptions.map((e) => {
        return e.textContent!.slice(0, 1).toLowerCase();
      });
      const currentChar = e.key.toLowerCase();
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
            indexDiff.value = charIndex + 1;
          }
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
