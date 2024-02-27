import {
  component$,
  Slot,
  type PropsOf,
  useSignal,
  useContextProvider,
} from '@builder.io/qwik';
import { type SelectContext } from './select-context';
import SelectContextId from './select-context';
import { Opt } from './select-inline';

export type SelectProps = PropsOf<'div'> & {
  value?: string;

  // our source of truth for the options. We get this at pre-render time in the inline component, that way we do not need textContent, etc.
  _options?: Opt[];

  // when a value is passed, we check if it's an actual option value, and get its index at pre-render time.
  _valuePropIndex?: number | null;
};

/* root component in select-inline.tsx */
export const SelectImpl = component$<SelectProps>((props) => {
  // refs
  const rootRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const listboxRef = useSignal<HTMLUListElement>();
  const options = props._options;

  // core state
  const selectedIndexSig = useSignal<number | null>(props._valuePropIndex ?? null);
  const highlightedIndexSig = useSignal<number | null>(props._valuePropIndex ?? null);
  const isListboxOpenSig = useSignal<boolean>(false);

  const context: SelectContext = {
    triggerRef,
    popoverRef,
    listboxRef,
    options,
    highlightedIndexSig,
    isListboxOpenSig,
    selectedIndexSig,
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
