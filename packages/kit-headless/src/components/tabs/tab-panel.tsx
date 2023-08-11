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
        data-tabpanel-id={fullPanelElementId}
        id={fullPanelElementId}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={fullTabElementId}
        class={[
          (props.class as Signal<string>)?.value ?? (props.class as string),
          (_extraClass as Signal<string>)?.value ?? (_extraClass as string),
          // TODO hiddenClass
          isSelectedSig.value && 'is-hidden'
        ]}
        // We need to use null so a previous hidden attribute is removed.
        hidden={isSelectedSig.value ? (null as unknown as undefined) : true}
      >
        <Slot />
      </div>
    );
  }
);
