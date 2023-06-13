import {
  component$,
  useContext,
  useId,
  Slot,
  useTask$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { isBrowser, isServer } from '@builder.io/qwik/build';

export interface TabPanelProps {
  class?: string;
}

export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  const contextService = useContext(tabsContextId);

  const serverAssignedIndexSig = useSignal<number | undefined>(undefined);

  const panelUID = useId();

  const matchedTabId = useComputed$(
    () => contextService.tabPanelsMap[panelUID]?.tabId
  );

  useTask$(({ cleanup }) => {
    if (isServer) {
      serverAssignedIndexSig.value =
        contextService.lastAssignedPanelIndexSig.value;
      contextService.lastAssignedPanelIndexSig.value++;
    }
    if (isBrowser) {
      contextService.onTabsChanged$();
    }
    cleanup(() => {
      contextService.onTabsChanged$();
    });
  });

  const isSelectedSignal = useComputed$(() => {
    if (isServer) {
      return (
        serverAssignedIndexSig.value === contextService.selectedIndexSig.value
      );
    }

    return (
      contextService.selectedIndexSig.value ===
      contextService.tabPanelsMap[panelUID]?.index
    );
  });

  return (
    <div
      data-tabpanel-id={panelUID}
      id={'tabpanel-' + panelUID}
      role="tabpanel"
      tabIndex={0}
      hidden={isSelectedSignal.value ? (null as unknown as undefined) : true}
      aria-labelledby={`tab-${matchedTabId.value}`}
      class={`${isSelectedSignal.value ? '' : 'is-hidden'}${
        props.class ? ` ${props.class}` : ''
      }`}
      style={isSelectedSignal.value ? 'display: block' : 'display: none'}
    >
      <Slot />
    </div>
  );
});
