import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectTriggerProps = QwikIntrinsicElements['button'];

export const SelectTrigger = component$((props: SelectTriggerProps) => {
  const selectContext = useContext(SelectContextId);
  const triggerRef = useSignal<HTMLElement>();
  selectContext.triggerRefSig = triggerRef;

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
      if (e.key === 'Home' || e.key === 'End') {
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
    <button ref={triggerRef} aria-expanded={selectContext.isOpenSig.value} {...props}>
      <Slot />
    </button>
  );
});
