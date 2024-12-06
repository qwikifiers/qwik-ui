import { createContextId } from '@builder.io/qwik';
import { TabsContext } from './tabs-context.type';

export const tabsContextId = createContextId<TabsContext>('qui--tabList');
