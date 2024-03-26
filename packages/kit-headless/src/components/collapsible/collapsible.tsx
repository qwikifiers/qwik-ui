import {
  component$,
  Slot,
  useContextProvider,
  useId,
  useSignal,
  $,
  type Signal,
  PropsOf,
} from '@builder.io/qwik';
import { collapsibleContextId } from './collapsible-context-id';
import { type CollapsibleContext } from './collapsible-context.type';
import { getHiddenHeight } from '../../utils/get-hidden-height';

export type CollapsibleProps = PropsOf<'div'> & {
  defaultOpen?: boolean | undefined;
  id?: string;
  'bind:isOpen'?: Signal<boolean | undefined>;
};

export const Collapsible = component$((props: CollapsibleProps) => {
  const { 'bind:isOpen': givenIsOpenSig, id, defaultOpen, ...rest } = props;

  const defaultOpenSig = useSignal<boolean>(defaultOpen ?? false);
  const isOpenSig = givenIsOpenSig ?? defaultOpenSig;

  const triggerRef = useSignal<HTMLButtonElement>();
  const contentRef = useSignal<HTMLElement>();
  const contentChildRef = useSignal<HTMLElement>();
  const initialStateSig = useSignal<boolean>(true);

  const contentHeightSig = useSignal<number | null>(null);

  const localId = useId();
  const itemId = id || localId;

  const getContentDimensions$ = $(() => {
    if (!contentRef.value || !contentChildRef.value) {
      throw new Error(
        'Qwik UI: There is no reference to the collapsible content element. Make sure to wrap the content in a <CollapsibleContent> component.',
      );
    }

    const { padding, border } = window.getComputedStyle(contentRef.value);

    // the animation breaks when padding is set, because the height is not initially 0.
    if (padding !== '0px') {
      contentRef.value.style.padding = '0';
      contentChildRef.value.style.padding = padding;
    }

    if (!border.includes('0px')) {
      contentRef.value.style.borderWidth = '0';
      contentChildRef.value.style.border = border;
    }

    if (contentHeightSig.value === null) {
      contentHeightSig.value = getHiddenHeight(contentRef.value);
    }

    contentRef.value.style.setProperty(
      '--qwikui-collapsible-content-height',
      `${contentHeightSig.value}px`,
    );
  });

  const context: CollapsibleContext = {
    isOpenSig,
    itemId,
    defaultOpen,
    triggerRef,
    contentRef,
    contentChildRef,
    contentHeightSig,
    initialStateSig,
    getContentDimensions$,
  };

  useContextProvider(collapsibleContextId, context);

  return (
    <div
      data-collapsible
      id={itemId}
      data-state={
        context.initialStateSig.value
          ? 'initial'
          : context.isOpenSig.value
          ? 'open'
          : 'closed'
      }
      {...rest}
    >
      <Slot />
    </div>
  );
});
