import {
  component$,
  useContext,
  useId,
  Slot,
  useTask$,
  useSignal,
  useVisibleTask$,
  QwikIntrinsicElements,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';
import { isBrowser, isServer } from '@builder.io/qwik/build';

export type TabPanelProps = QwikIntrinsicElements['div'];

export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  const contextService = useContext(tabsContextId);
  const isSelectedSig = useSignal(false);
  const serverAssignedIndexSig = useSignal<number | undefined>(undefined);
  const matchedTabIdSig = useSignal<string | undefined>(undefined);

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
    const isSelected = await track(() =>
      contextService.isPanelSelected$(panelUID)
    );

    if (isServer) {
      isSelectedSig.value = await contextService.isIndexSelected$(
        serverAssignedIndexSig.value
      );
      return;
    }

    isSelectedSig.value = isSelected;
  });

  useVisibleTask$(async function matchedPanelIdTask({ track }) {
    matchedTabIdSig.value = await track(() =>
      contextService.getMatchedTabId$(panelUID)
    );
  });

  return (
    <div
      data-tabpanel-id={panelUID}
      id={'tabpanel-' + panelUID}
      role="tabpanel"
      tabIndex={0}
      hidden={isSelectedSig.value ? (null as unknown as undefined) : true}
      aria-labelledby={`tab-${matchedTabIdSig.value}`}
      class={`${isSelectedSig.value ? '' : 'is-hidden'}${
        props.class ? ` ${props.class}` : ''
      }`}
      style={isSelectedSig.value ? 'display: block' : 'display: none'}
    >
      <Slot />
    </div>
  );
});
