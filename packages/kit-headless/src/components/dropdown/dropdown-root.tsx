import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useSignal,
  useContextProvider,
  useTask$,
  type QRL,
  useId,
  useComputed$,
} from '@builder.io/qwik';
import { dropdownContextId, type DropdownContext } from './dropdown-context';
import { useDropdown } from './use-dropdown';

export type TItemsMap = Map<
  number,
  { value: string; displayValue: string; disabled: boolean }
>;

export type InternalDropdownProps = {
  /** Our source of truth for the items. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _itemsMap: TItemsMap;
};

export type DropdownProps = PropsOf<'div'> & {
  /** A signal that controls the current open state (controlled). */
  'bind:open'?: Signal<boolean>;

  /**
   * QRL handler that runs when the dropdown opens or closes.
   * @param open The new state of the dropdown.
   *
   */
  onOpenChange$?: QRL<(open: boolean) => void>;

  /**
   *  The native scrollIntoView method is used to scroll the options into view when the user highlights an option. This allows customization of the scroll behavior.
   */
  scrollOptions?: ScrollIntoViewOptions;

  /**
   *  Enables looped behavior when the user navigates through the options using the arrow keys.
   */
  loop?: boolean;
};

/* root component in dropdown-inline.tsx */
export const HDropdownImpl = component$<DropdownProps & InternalDropdownProps>(
  (props: DropdownProps & InternalDropdownProps) => {
    const {
      _itemsMap,
      onOpenChange$,
      scrollOptions: givenScrollOptions,
      loop: givenLoop,
      ...rest
    } = props;

    // refs
    const rootRef = useSignal<HTMLDivElement>();
    const triggerRef = useSignal<HTMLButtonElement>();
    const popoverRef = useSignal<HTMLElement>();
    const contentRef = useSignal<HTMLElement>();
    const loop = givenLoop ?? false;

    // ids
    const localId = useId();
    const dropdownId = `${localId}-dropdown`;

    // source of truth
    const itemsMapSig = useComputed$(() => {
      return _itemsMap;
    });

    const highlightedIndexSig = useSignal<number | null>(null);

    const isOpenSig = useSignal<boolean>(false);
    const scrollOptions = givenScrollOptions ?? {
      behavior: 'instant',
      block: 'nearest',
    };

    const currDisplayValueSig = useSignal<string | string[]>();

    const initialLoadSig = useSignal<boolean>(true);
    const highlightedItemRef = useSignal<HTMLLIElement>();

    const context: DropdownContext = {
      itemsMapSig,
      currDisplayValueSig,
      highlightedIndexSig,
      isOpenSig,
      triggerRef,
      popoverRef,
      contentRef,
      highlightedItemRef,
      localId,
      scrollOptions,
      loop,
    };

    useContextProvider(dropdownContextId, context);

    const { getActiveDescendant$ } = useDropdown();

    useTask$(function reactiveUserOpen({ track }) {
      const bindOpenSig = props['bind:open'];
      if (!bindOpenSig) return;
      track(() => bindOpenSig.value);

      isOpenSig.value = bindOpenSig.value ?? isOpenSig.value;
    });

    useTask$(function onOpenChangeTask({ track }) {
      track(() => isOpenSig.value);

      if (!initialLoadSig.value) {
        onOpenChange$?.(isOpenSig.value);
      }
    });

    const activeDescendantSig = useComputed$(() => {
      if (isOpenSig.value) {
        return getActiveDescendant$(highlightedIndexSig.value ?? -1);
      } else {
        return '';
      }
    });

    useTask$(() => {
      initialLoadSig.value = false;
    });

    return (
      <div
        role="dropdown"
        ref={rootRef}
        data-open={context.isOpenSig.value ? true : undefined}
        data-closed={!context.isOpenSig.value ? true : undefined}
        aria-controls={dropdownId}
        aria-expanded={context.isOpenSig.value}
        aria-haspopup="true"
        aria-activedescendant={activeDescendantSig.value}
        {...rest}
      >
        <Slot />
      </div>
    );
  },
);
