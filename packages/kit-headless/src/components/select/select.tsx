import {
  component$,
  Slot,
  type PropsOf,
  useSignal,
  useContextProvider,
  Signal,
  useTask$,
} from '@builder.io/qwik';
import { type SelectContext } from './select-context';
import SelectContextId from './select-context';
import { Opt } from './select-inline';

export type SelectProps = PropsOf<'div'> & {
  value?: string;
  'bind:value'?: Signal<string>;

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
  const optionsIndex = new Map(options.map((option, index) => [option.value, index]));

  // core state
  const selectedIndexSig = useSignal<number | null>(props._valuePropIndex ?? null);
  const highlightedIndexSig = useSignal<number | null>(props._valuePropIndex ?? null);
  const isListboxOpenSig = useSignal<boolean>(false);

  // Maps are apparently great for this index accessing. Will learn more about them this week and refactor this to have a more consistent API and eliminate redundancy / duplication.
  useTask$(({ track }) => {
    const bindValue = track(() => props['bind:value']?.value);

    const matchingIndex = optionsIndex.get(bindValue) ?? -1;
    if (matchingIndex !== -1) {
      selectedIndexSig.value = matchingIndex;
      highlightedIndexSig.value = matchingIndex;
    }
  });

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
