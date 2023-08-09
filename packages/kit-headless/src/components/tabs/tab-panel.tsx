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
  /** @deprecated Internal use only */
  _index?: number;
  /** @deprecated Internal use only */
  _tabId?: string;
} & QwikIntrinsicElements['div'];

export const TAB_PANEL_ID_PREFIX = '_tabpanel_';

export const TabPanel = component$(({ _index, _tabId, ...props }: TabPanelProps) => {
  const contextService = useContext(tabsContextId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tabId = _tabId!;

  const fullPanelElementId = contextService.tabsPrefix + TAB_PANEL_ID_PREFIX + tabId;
  const fullTabElementId = contextService.tabsPrefix + TAB_ID_PREFIX + tabId;

  const isSelectedSig = useComputed$(() => {
    return contextService.selectedIndexSig.value === _index;
  });

  return (
    <div
      data-tabpanel-id={fullPanelElementId}
      id={fullPanelElementId}
      role="tabpanel"
      tabIndex={0}
      hidden={isSelectedSig.value ? (null as unknown as undefined) : true}
      aria-labelledby={fullTabElementId}
      class={[
        (props.class as Signal<string>)?.value ?? (props.class as string),
        isSelectedSig.value && 'is-hidden'
      ]}
      // TODO require to do this via CSS in non-headless wrappers
      style={isSelectedSig.value ? 'display: block' : 'display: none'}
    >
      <Slot />
    </div>
  );
});
