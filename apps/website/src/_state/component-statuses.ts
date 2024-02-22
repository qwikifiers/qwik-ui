import { ComponentStatus } from './component-status.type';

export interface ComponentsStatusesMap {
  [key: string]: ComponentStatus;
}

export type ComponentKitsStatuses = {
  styled: ComponentsStatusesMap;
  headless: ComponentsStatusesMap;
};

export const statusByComponent: ComponentKitsStatuses = {
  styled: {
    Accordion: ComponentStatus.Beta,
    Badge: ComponentStatus.Draft,
    Button: ComponentStatus.Draft,
    Card: ComponentStatus.Draft,
    Checkbox: ComponentStatus.Draft,
    Combobox: ComponentStatus.Draft,
    Input: ComponentStatus.Draft,
    Label: ComponentStatus.Draft,
    Modal: ComponentStatus.Draft,
    Pagination: ComponentStatus.Draft,
    Tabs: ComponentStatus.Beta,
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
