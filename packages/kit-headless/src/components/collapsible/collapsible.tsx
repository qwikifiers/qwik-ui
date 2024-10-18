import {
  component$,
  Slot,
  useContextProvider,
  useId,
  useSignal,
  $,
  type Signal,
  type PropsOf,
  type QRL,
  useTask$,
} from '@builder.io/qwik';

import { type CollapsibleContext, collapsibleContextId } from './collapsible-context';
import { isBrowser } from '@builder.io/qwik/build';
import { useCollapsible } from './use-collapsible';

export type PublicCollapsibleRootProps = PropsOf<'div'> & {
  /** The ID of the underlaying HTML element. */
  id?: string;
  /**	Uncontrolled initial expanded value. */
  open?: boolean | undefined;
  /** Controlled expanded value, manages the collapsible content. */
  'bind:open'?: Signal<boolean>;
  /**	Function called when the collapsible opens or closes. */
  onChange$?: QRL<(open: boolean) => void>;
  /** @deprecated use `onChange$` instead. */
  onOpenChange$?: QRL<(open: boolean) => void>;
  /** Disables the collapsible when true. */
  disabled?: boolean;
  /** Passes reference to trigger instead of root. */
  triggerRef?: Signal<HTMLButtonElement>;
  /** When false, collapsible will never collapse (will remain open). */
  collapsible?: boolean;
  /** If true, supports previous accordion animations. */
  accordionItem?: boolean;
};

export const HCollapsible = component$((props: PublicCollapsibleRootProps) => {
  const {
    disabled,
    onOpenChange$,
    onChange$,
    'bind:open': givenIsOpenSig,
    id,
    triggerRef: givenTriggerRef,
    collapsible = true,
    open,
    accordionItem,
    ...rest
  } = props;

  const defaultOpenSig = useSignal<boolean>(open ?? false);
  const isOpenSig = givenIsOpenSig ?? defaultOpenSig;

  const defaultTriggerRef = useSignal<HTMLButtonElement>();
  const triggerRef = givenTriggerRef ?? defaultTriggerRef;
  const contentRef = useSignal<HTMLElement>();

  const contentHeightSig = useSignal<number | null>(null);

  const { getHiddenHeight } = useCollapsible();

  const localId = useId();
  const itemId = id ?? localId;

  useTask$(function onOpenChangeTask({ track }) {
    track(() => isOpenSig.value);

    if (isBrowser) {
      // syntactic sugar
      onOpenChange$?.(isOpenSig.value);
      onChange$?.(isOpenSig.value);
    }
  });

  const getContentDimensions$ = $(async () => {
    if (!contentRef.value) {
      throw new Error(
        'Qwik UI: There is no reference to the collapsible content element. Make sure to wrap the content in a <CollapsibleContent> component.',
      );
    }

    if (contentHeightSig.value === null) {
      contentHeightSig.value = await getHiddenHeight(contentRef.value);
    }

    if (contentHeightSig.value !== 0) {
      contentRef.value.style.setProperty(
        '--qwikui-collapsible-content-height',
        `${contentHeightSig.value}px`,
      );

      // support previous accordion animations
      if (accordionItem) {
        contentRef.value.style.setProperty(
          '--qwikui-accordion-content-height',
          `${contentHeightSig.value}px`,
        );
      }
    }
  });

  const context: CollapsibleContext = {
    isOpenSig,
    itemId,
    triggerRef,
    contentRef,
    contentHeightSig,
    getContentDimensions$,
    disabled,
    collapsible,
  };

  useContextProvider(collapsibleContextId, context);

  return (
    <div
      id={itemId}
      data-collapsible
      data-disabled={context.disabled ? '' : undefined}
      data-open={context.isOpenSig.value ? '' : undefined}
      data-closed={!context.isOpenSig.value ? '' : undefined}
      aria-live="polite"
      {...rest}
    >
      <Slot />
    </div>
  );
});
