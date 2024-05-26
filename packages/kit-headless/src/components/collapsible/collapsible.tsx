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
import { collapsibleContextId } from './collapsible-context-id';
import { type CollapsibleContext } from './collapsible-context.type';
import { isBrowser } from '@builder.io/qwik/build';
import { getHiddenHeight } from '../../utils/get-hidden-height';

export type CollapsibleProps = PropsOf<'div'> & {
  id?: string;
  open?: boolean | undefined;
  'bind:open'?: Signal<boolean>;
  onChange$?: QRL<(open: boolean) => void>;
  /** @deprecated use `onChange$` instead */
  onOpenChange$?: QRL<(open: boolean) => void>;
  disabled?: boolean;
  triggerRef?: Signal<HTMLButtonElement>;
  collapsible?: boolean;
  accordionItem?: boolean;
  animated?: boolean;
};

export const HCollapsible = component$((props: CollapsibleProps) => {
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
    animated,
    ...rest
  } = props;

  const defaultOpenSig = useSignal<boolean>(open ?? false);
  const isOpenSig = givenIsOpenSig ?? defaultOpenSig;

  const defaultTriggerRef = useSignal<HTMLButtonElement>();
  const triggerRef = givenTriggerRef ?? defaultTriggerRef;
  const contentRef = useSignal<HTMLElement>();
  const isAnimatedSig = useSignal<boolean>(animated === true);

  const contentHeightSig = useSignal<number | null>(null);

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
      contentHeightSig.value = getHiddenHeight(contentRef.value);
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
    isAnimatedSig,
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
      {...rest}
    >
      <Slot />
    </div>
  );
});
