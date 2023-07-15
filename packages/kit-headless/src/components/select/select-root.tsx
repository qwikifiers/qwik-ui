import {
  $,
  QwikIntrinsicElements,
  Slot,
  component$,
  useContextProvider,
  useOn,
  useOnDocument,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { SelectContext } from './select-context.type';
import SelectContextId from './select-context-id';
import { computePosition, flip } from '@floating-ui/dom';

export type SelectRootProps = {
  required?: boolean;
} & QwikIntrinsicElements['div'];

export const SelectRoot = component$((props: SelectRootProps) => {
  const options = useStore([]);
  const selection = useSignal(null);
  const isExpanded = useSignal(false);
  const triggerRef = useSignal<HTMLElement>();
  const listBoxRef = useSignal<HTMLElement>();

  const selectContext: SelectContext = {
    options,
    selection,
    isExpanded,
    triggerRef,
    listBoxRef,
  };

  useContextProvider(SelectContextId, selectContext);
  useCollateOptions(selectContext);
  useUpdatePosition(selectContext);
  useDismiss(selectContext);

  return (
    <div {...props}>
      <Slot />
    </div>
  );
});

function useDismiss(context: SelectContext) {
  useOnDocument(
    'click',
    $((e) => {
      const target = e.target as HTMLElement;
      if (
        context.isExpanded.value === true &&
        !context.listBoxRef.value?.contains(target) &&
        !context.triggerRef.value?.contains(target)
      ) {
        context.isExpanded.value = false;
      }
    })
  );

  useOn(
    'keydown',
    $((e) => {
      const event = e as KeyboardEvent;
      if (event.key === 'Escape') {
        context.isExpanded.value = false;
      }
    })
  );
}

function useUpdatePosition(context: SelectContext) {
  const updatePosition$ = $(
    (referenceEl: HTMLElement, floatingEl: HTMLElement) => {
      computePosition(referenceEl, floatingEl, {
        placement: 'bottom',
        middleware: [flip()],
      }).then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  );

  useVisibleTask$(async ({ track }) => {
    const trigger = track(() => context.triggerRef.value);
    const listBox = track(() => context.listBoxRef.value);
    const expanded = track(() => context.isExpanded.value);

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
}

function useCollateOptions(context: SelectContext) {
  useVisibleTask$(({ track }) => {
    const listBox = track(() => context.listBoxRef.value);

    if (listBox) {
      const collatedOptions = Array.from(
        listBox.querySelectorAll('[role="option"]')
      ) as HTMLElement[];

      context.options.push(...collatedOptions);
    }
  });
}
