import {
  component$,
  useContext,
  useId,
  Slot,
  useTask$,
  useComputed$,
} from '@builder.io/qwik';
import { tabsContextId } from './tabs-context-id';

export interface TabPanelProps {
  class?: string;
}

export const TabPanel = component$(({ ...props }: TabPanelProps) => {
  const contextService = useContext(tabsContextId);
  const panelUID = useId();

  const matchedTabId = useComputed$(
    () => contextService.tabPanelsMap[panelUID]?.index
  );

  useTask$(({ cleanup }) => {
    contextService.tabsChanged$();

    cleanup(() => {
      contextService.tabsChanged$();
    });
  });

  const isSelectedSignal = useComputed$(() => {
    return (
      contextService.selectedIndex.value ===
      contextService.tabPanelsMap[panelUID]?.index
    );
  });

  return (
    <div
      data-tabpanel-id={panelUID}
      id={'tabpanel-' + panelUID}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-${matchedTabId}`}
      class={`${isSelectedSignal.value ? 'is-hidden' : ''}${
        props.class ? ` ${props.class}` : ''
      }`}
      style={isSelectedSignal.value ? 'display: block' : 'display: none'}
    >
      <Slot />
    </div>
  );
});
