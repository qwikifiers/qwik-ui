/* eslint-disable qwik/valid-lexical-scope */
import {
  $,
  Fragment,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  type ContextId,
  type QRL,
  type Signal
} from '@builder.io/qwik';
import { type JSXNode } from '@builder.io/qwik/jsx-runtime';

// Define public API for opening up Portals
export const openPortalContextId =
  createContextId<
    QRL<
      (
        name: string,
        elementToProject: JSXNode,
        contexts?: Array<ContextPair<unknown>>
      ) => QRL<() => void>
    >
  >('PortalProviderAPI');

export type ContextPair<T> = { id: ContextId<T>; value: T };

// Define public API for closing Portals
export const closePortalContextId = createContextId<QRL<() => void>>('PortalCloseAPI');

// internal context for managing portals
const portalInfoListContextId = createContextId<Signal<Array<PortalInfo>>>('Portals');

interface PortalInfo {
  name: string;
  elementToProject: JSXNode;
  contextPairs: Array<ContextPair<unknown>>;
  close$?: QRL<() => void>;
}

export const QwikUIProvider = component$(() => {
  const portalInfoListSig = useSignal<PortalInfo[]>([]);
  useContextProvider(portalInfoListContextId, portalInfoListSig);

  // Provide the public API for the PopupManager for other components.
  useContextProvider(
    openPortalContextId,
    $(
      (
        name: string,
        elementToProject: JSXNode,
        contextPairs?: Array<ContextPair<unknown>>
      ) => {
        const portalInfo: PortalInfo = {
          name,
          elementToProject,
          contextPairs: contextPairs || []
        };
        portalInfo.close$ = $(function removePortalFromList() {
          portalInfoListSig.value = portalInfoListSig.value.filter(
            (currentPortalInfo) => currentPortalInfo !== portalInfo
          );
        });
        portalInfo.contextPairs.push({
          id: closePortalContextId,
          value: portalInfo.close$
        });
        portalInfoListSig.value = [...portalInfoListSig.value, portalInfo];
        return portalInfo.close$;
      }
    )
  );
  return (
    <>
      <Slot />
      <Portal name="comboboxPortal" />
    </>
  );
});

/**
 * IMPORTANT: In order for the <Portal> to correctly render in SSR, it needs
 * to be rendered AFTER the call to open portal. (Setting content to portal
 * AFTER the portal is rendered can't be done in SSR, because it is not possible
 * to return back to the <Portal/> after it has been streamed to the client.)
 */
export const Portal = component$<{ name: string }>(({ name }) => {
  const portalInfoList = useContext(portalInfoListContextId);
  const myPortalInfoList = portalInfoList.value.filter((portal) => portal.name === name);
  return (
    <>
      {myPortalInfoList.map((portalInfo) => (
        <Fragment key={name}>
          <WrapJsxInContext
            elementToProject={portalInfo.elementToProject}
            contextPairs={portalInfo.contextPairs}
          />
        </Fragment>
      ))}
    </>
  );
});

export const WrapJsxInContext = component$<{
  elementToProject: JSXNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextPairs: Array<ContextPair<any>>;
}>(({ elementToProject, contextPairs }) => {
  // eslint-disable-next-line qwik/use-method-usage
  contextPairs.forEach(({ id, value }) => useContextProvider(id, value));
  return (
    <>
      {/* Workaround: https://github.com/BuilderIO/qwik/issues/4966 */}
      {/* {jsx} */}
      {[elementToProject].map((jsx) => jsx)}
    </>
  );
});
