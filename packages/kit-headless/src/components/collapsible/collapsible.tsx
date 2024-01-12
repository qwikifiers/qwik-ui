import {
  component$,
  Slot,
  useContextProvider,
  useId,
  useSignal,
  $,
  type Signal,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import { collapsibleContextId } from './collapsible-context-id';
import { type CollapsibleContext } from './collapsible-context.type';
import { getHiddenHeight } from '../../utils/get-hidden-height';

export type CollapsibleProps = QwikIntrinsicElements['div'] & {
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
  const initialStateSig = useSignal<boolean>(true);

  const contentHeightSig = useSignal<number | null>(null);

  const localId = useId();
  const itemId = id || localId;

  const getContentDimensions$ = $(() => {
    if (!contentRef.value) {
      throw new Error(
        'Qwik UI: There is no reference to the collapsible content element. Make sure to wrap the content in a <CollapsibleContent> component.',
      );
    }

    const height = getHiddenHeight(contentRef.value);

    if (height !== 0) {
      contentHeightSig.value = height;
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
    contentHeightSig,
    initialStateSig,
    getContentDimensions$,
  };

  useContextProvider(collapsibleContextId, context);

  return (
    <div
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
