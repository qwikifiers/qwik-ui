import {
  component$,
  Slot,
  type PropsOf,
  useSignal,
  useContextProvider,
  type Signal,
  useTask$,
} from '@builder.io/qwik';
import { type SelectContext } from './select-context';
import SelectContextId from './select-context';
import { Opt } from './select-inline';

export type SelectProps = PropsOf<'div'> & {
  value?: string;

  // our source of truth for the options. We get this at pre-render time in the inline component, that way we do not need textContent, etc.
  _options?: Opt[];

  // when a value is passed, we check if it's an actual option value, and get its index at pre-render time.
  _valuePropIndex?: number;
};

/* root component in select-inline.tsx */
export const SelectImpl = component$<SelectProps>((props) => {
  // refs
  const rootRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const listboxRef = useSignal<HTMLUListElement>();
  const optionRefsArray = useSignal<Signal<HTMLLIElement>[]>([]);
  const value = props.value;
  const options = props._options;

  // core state
  const selectedIndexSig = useSignal<number | null>(null);
  const selectedOptionRef = useSignal<HTMLLIElement | null>(null);
  const isListboxOpenSig = useSignal<boolean>(false);
  const highlightedIndexSig = useSignal<number | null>(props._valuePropIndex ?? null);

  useTask$(function deriveSelectedRef({ track }) {
    track(() => selectedIndexSig.value);

    if (selectedIndexSig.value !== null) {
      selectedOptionRef.value = optionRefsArray.value[selectedIndexSig.value].value;
    }
  });

  const context: SelectContext = {
    triggerRef,
    popoverRef,
    listboxRef,
    selectedOptionRef,
    optionRefsArray,
    options,
    highlightedIndexSig,
    isListboxOpenSig,
    selectedIndexSig,
    value,
  };

  useContextProvider(SelectContextId, context);

  return (
    <div
      role="combobox"
      ref={rootRef}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </div>
  );
});
