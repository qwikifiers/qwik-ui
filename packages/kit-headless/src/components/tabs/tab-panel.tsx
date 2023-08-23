/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useComputed$,
  useContext
} from '@builder.io/qwik';
import { TAB_ID_PREFIX } from './tab';
import { tabsContextId } from './tabs-context-id';

export type TabPanelProps = {
  /** Optional tab contents. */
  label?: QwikIntrinsicElements['div']['children'];
  selected?: boolean;
  disabled?: boolean;

  /** @deprecated Internal use only */
  _tabId?: string;
  /** @deprecated Internal use only */
  _extraClass?: QwikIntrinsicElements['div']['class'];
} & QwikIntrinsicElements['div'];

export const TAB_PANEL_ID_PREFIX = '_tabpanel_';

export const TabPanel = component$(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, _tabId, _extraClass, ...props }: TabPanelProps) => {
    const contextService = useContext(tabsContextId);

    const fullPanelElementId = contextService.tabsPrefix + TAB_PANEL_ID_PREFIX + _tabId!;
    const fullTabElementId = contextService.tabsPrefix + TAB_ID_PREFIX + _tabId!;

    const isSelectedSig = useComputed$(() => {
      return contextService.selectedTabIdSig.value === _tabId;
    });

    return (
      <div
        {...props}
        id={fullPanelElementId}
        aria-labelledby={fullTabElementId}
        role="tabpanel"
        tabIndex={0}
        class={[
          (props.class as Signal<string>)?.value ?? (props.class as string),
          (_extraClass as Signal<string>)?.value ?? (_extraClass as string)
        ]}
        hidden={!isSelectedSig.value}
      >
        <Slot />
      </div>
    );
  }
);
