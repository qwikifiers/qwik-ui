import { ComponentStatus } from './component-status.type';

export interface ComponentsStatusesMap {
  [key: string]: ComponentStatus;
}

export type ComponentKitsStatuses = {
  fluffy: ComponentsStatusesMap;
  headless: ComponentsStatusesMap;
};

export const statusByComponent: ComponentKitsStatuses = {
  fluffy: {
    Badge: ComponentStatus.Beta,
    Button: ComponentStatus.Beta,
    Pagination: ComponentStatus.Draft,
  },
  headless: {
    Accordion: ComponentStatus.Beta,
    Collapsible: ComponentStatus.Draft,
    Combobox: ComponentStatus.Beta,
    Modal: ComponentStatus.Beta,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Beta,
    Select: ComponentStatus.Draft,
    Separator: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Tooltip: ComponentStatus.Draft,
  },
};
