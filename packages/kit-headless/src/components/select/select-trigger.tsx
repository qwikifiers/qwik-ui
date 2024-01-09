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
  selectContext.triggerRef = triggerRef;

  // eslint-disable-next-line qwik/no-use-visible-task
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

  // eslint-disable-next-line qwik/no-use-visible-task
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
