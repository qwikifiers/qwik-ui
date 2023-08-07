import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useId,
  useSignal,
  useTask$,
  useVisibleTask$
} from '@builder.io/qwik';
import { isBrowser, isServer } from '@builder.io/qwik/build';
import { tabsContextId } from './tabs-context-id';

export type TabPanelProps = {
  /** @deprecated Internal use only */
  tabId?: string;
} & QwikIntrinsicElements['div'];

export const TabPanel = component$(({ index, tabId, ...props }: TabPanelProps) => {
  console.log('TabPanel', props);
  const contextService = useContext(tabsContextId);
  const isSelectedSig = useSignal(false);
  const serverAssignedIndexSig = useSignal<number | undefined>(undefined);

  const panelUID = useId();

  useTask$(async function initIndexTask({ cleanup }) {
    if (isServer) {
      serverAssignedIndexSig.value =
        await contextService.getNextServerAssignedPanelIndex$();
    }
    if (isBrowser) {
      contextService.reIndexTabs$();
    }
    cleanup(() => {
      contextService.reIndexTabs$();
    });
  });

  useTask$(async function isSelectedPanelTask({ track }) {
    const isSelected = await track(() => contextService.isPanelSelected$(panelUID));

    if (isServer) {
      isSelectedSig.value = await contextService.isIndexSelected$(
        serverAssignedIndexSig.value
      );
      return;
    }

    isSelectedSig.value = isSelected;
  });

  return (
    <div
      data-tabpanel-id={tabId}
      id={'tabpanel-' + tabId}
      role="tabpanel"
      tabIndex={0}
      hidden={isSelectedSig.value ? (null as unknown as undefined) : true}
      aria-labelledby={`tab-${tabId}`}
      class={`${isSelectedSig.value ? '' : 'is-hidden'}${
        props.class ? ` ${props.class}` : ''
      }`}
      style={isSelectedSig.value ? 'display: block' : 'display: none'}
    >
      panel
      <Slot />
    </div>
  );
});
