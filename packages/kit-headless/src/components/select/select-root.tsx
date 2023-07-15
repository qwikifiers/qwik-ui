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
import { VisuallyHidden } from '../../utils/visually-hidden';
import { useTask$ } from '@builder.io/qwik';
import { NativeSelect } from './select-native-select';

export type SelectRootProps = {
  required?: boolean;
} & QwikIntrinsicElements['div'];

export const SelectRoot = component$((props: SelectRootProps) => {
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
    listBoxRef,
  };

  useTask$(({ track }) => {
    track(() => selection.value);
  });

  useContextProvider(SelectContextId, selectContext);
  useCollectOptions(selectContext);
  useUpdatePosition(selectContext);
  useDismiss(selectContext);

  return (
    <div {...props}>
      <Slot />
      {props.required ? (
        <VisuallyHidden>
          <NativeSelect />
        </VisuallyHidden>
      ) : null}
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
      e.preventDefault();
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

function useCollectOptions(context: SelectContext) {
  useVisibleTask$(({ track }) => {
    const listBox = track(() => context.listBoxRef.value);

    if (listBox) {
      const collectedOptions = Array.from(
        listBox.querySelectorAll('[role="option"]')
      ) as HTMLElement[];

      context.options.push(...collectedOptions);
    }
  });
}
