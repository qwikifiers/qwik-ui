import {
  ContextId,
  FunctionComponent,
  JSXNode,
  QRL,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';

import { ContextPair, openPortalContextId } from '../qwik-ui-provider';
import ComboboxContextId from './combobox-context-id';

export const ComboboxPortal: FunctionComponent<{
  children: JSXNode;
  contextIds?: ComboboxPortalProps['contextIds'];
}> = ({ children, contextIds }) => {
  return <ComboboxPortalImpl contextIds={contextIds} elementToTeleport={children} />;
};

export type ComboboxPortalProps = {
  elementToTeleport: JSXNode;
  contextIds?: ContextId<unknown>[];
};

export const ComboboxPortalImpl = component$((props: ComboboxPortalProps) => {
  const contextPairsSig = useSignal<ContextPair[]>([]);

  const comboboxContext = useContext(ComboboxContextId);

  useTask$(async function syncContextIdsFromProps({ track }) {
    const contextIdsFromProps = track(() => props.contextIds);
    contextPairsSig.value = [{ id: ComboboxContextId, value: comboboxContext }];

    contextIdsFromProps?.map((id) => {
      // eslint-disable-next-line qwik/use-method-usage
      contextPairsSig.value.push({ id, value: useContext(id as ContextId<object>) });
    });
  });

  const openPortal$ = useContext(openPortalContextId);

  const closePortalSig = useSignal<QRL<() => void>>();

  useVisibleTask$(async function openOrCloseListBox({ track }) {
    track(() => comboboxContext.isListboxOpenSig.value);
    track(() => contextPairsSig.value);

    if (comboboxContext.isListboxOpenSig.value && contextPairsSig.value) {
      closePortalSig.value = await openPortal$(
        comboboxContext.localId,
        props.elementToTeleport,
        contextPairsSig.value,
      );
    } else if (closePortalSig.value) {
      const closePortal$ = closePortalSig.value;
      await closePortal$();
    }
  });

  useVisibleTask$(async function cleanupTeleportedElement({ cleanup }) {
    cleanup(async () => {
      if (closePortalSig.value) {
        const closePortal$ = closePortalSig.value;
        await closePortal$();
      }
    });
  });

  return <Slot />;
});
