import {
  $,
  component$,
  QwikIntrinsicElements,
  Slot,
  useContextProvider,
  useOnDocument,
  useSignal,
  useStore,
  useVisibleTask$
} from '@builder.io/qwik';
import { SelectContext } from './select-context.type';
import SelectContextId from './select-context-id';
import { NativeSelect } from './select-native-select';
import { VisuallyHidden } from '../../utils/visually-hidden';
import { computePosition, flip } from '@floating-ui/dom';

export type SelectRootProps = {
  required?: boolean;
} & QwikIntrinsicElements['div'];

export const SelectRoot = component$((props: SelectRootProps) => {
  const rootRef = useSignal<HTMLElement>();
  const options = useStore([]);
  const selection = useSignal('');
  const isExpanded = useSignal(false);
  const triggerRef = useSignal<HTMLElement>();
  const listBoxRef = useSignal<HTMLElement>();

  const selectContext: SelectContext = {
    options,
    selection,
    isExpanded,
    triggerRef,
    listBoxRef
  };

  useContextProvider(SelectContextId, selectContext);

  useOnDocument(
    'click',
    $((e) => {
      const target = e.target as HTMLElement;
      if (selectContext.isExpanded.value === true && !rootRef.value?.contains(target)) {
        selectContext.isExpanded.value = false;
      }
    })
  );

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === 'Escape') {
        selectContext.isExpanded.value = false;
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
      middleware: [flip()]
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  });

  useVisibleTask$(async function toggleSelectListBox({ track }) {
    const trigger = track(() => selectContext.triggerRef.value);
    const listBox = track(() => selectContext.listBoxRef.value);
    const expanded = track(() => selectContext.isExpanded.value);

    if (!trigger || !listBox) return;

    if (expanded === true) {
      listBox.style.visibility = 'hidden';
      await updatePosition$(trigger, listBox);
      listBox.style.visibility = 'visible';
      listBox?.focus();
    }

    if (expanded === false) {
      trigger?.focus();
    }
  });

  useVisibleTask$(function collectOptions({ track }) {
    const listBox = track(() => selectContext.listBoxRef.value);

    if (listBox) {
      const collectedOptions = Array.from(
        listBox.querySelectorAll('[role="option"]')
      ) as HTMLElement[];
      selectContext.options.push(...collectedOptions);
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
