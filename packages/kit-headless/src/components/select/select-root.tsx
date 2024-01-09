import {
  $,
  component$,
  QwikIntrinsicElements,
  Slot,
  useContextProvider,
  useOnDocument,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { computePosition, flip } from '@floating-ui/dom';
import { VisuallyHidden } from '../../utils/visually-hidden';
import SelectContextId from './select-context-id';
import { SelectContext } from './select-context.type';
import { NativeSelect } from './select-native-select';

export type SelectRootProps = {
  required?: boolean;
} & QwikIntrinsicElements['div'];

export const SelectRoot = component$((props: SelectRootProps) => {
  const rootRef = useSignal<HTMLElement>();
  const optionsStore = useStore([]);
  const selectedOptionSig = useSignal('');
  const isOpenSig = useSignal(false);
  const triggerRef = useSignal<HTMLElement>();
  const listboxRef = useSignal<HTMLElement>();
  const isListboxHiddenSig = useSignal(true);

  const context: SelectContext = {
    optionsStore,
    selectedOptionSig,
    isOpenSig,
    triggerRef,
    listboxRef,
    isListboxHiddenSig,
  };

  useContextProvider(SelectContextId, context);

  useOnDocument(
    'click',
    $((e) => {
      const target = e.target as HTMLElement;
      if (context.isOpenSig.value === true && !rootRef.value?.contains(target)) {
        context.isOpenSig.value = false;
      }
    }),
  );

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === 'Escape') {
        context.isOpenSig.value = false;
      }
    }
    rootRef.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      rootRef.value?.removeEventListener('keydown', keyHandler);
    });
  });

  const updatePosition$ = $((referenceEl: HTMLElement, floatingEl: HTMLElement) => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom',
      middleware: [flip()],
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async function toggleSelectListBox({ track }) {
    const trigger = track(() => context.triggerRef.value);
    const listBox = track(() => context.listboxRef.value);
    const expanded = track(() => context.isOpenSig.value);

    if (!trigger || !listBox) return;

    if (expanded === true) {
      // Will fix this visibility workaround asap.
      listBox.style.visibility = 'hidden';
      await updatePosition$(trigger, listBox);
      listBox.style.visibility = 'visible';
      isListboxHiddenSig.value = false;
      listBox?.focus();
    }

    if (expanded === false) {
      trigger?.focus();
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(function collectOptions({ track }) {
    const listBox = track(() => context.listboxRef.value);

    if (listBox) {
      const collectedOptions = Array.from(
        listBox.querySelectorAll('[role="option"]'),
      ) as HTMLElement[];
      context.optionsStore.push(...collectedOptions);
    }
  });

  return (
    <div ref={rootRef} {...props}>
      <Slot />
      {props.required ? (
        <VisuallyHidden>
          <NativeSelect />
        </VisuallyHidden>
      ) : null}
    </div>
  );
});
