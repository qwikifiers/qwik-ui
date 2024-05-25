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
    Avatar: ComponentStatus.Draft,
    Alert: ComponentStatus.Beta,
    Badge: ComponentStatus.Beta,
    Breadcrumb: ComponentStatus.Draft,
    Button: ComponentStatus.Beta,
    Card: ComponentStatus.Beta,
    Checkbox: ComponentStatus.Draft,
    Combobox: ComponentStatus.Draft,
    Input: ComponentStatus.Draft,
    Label: ComponentStatus.Beta,
    Modal: ComponentStatus.Draft,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Draft,
    Progress: ComponentStatus.Draft,
    RadioGroup: ComponentStatus.Draft,
    Select: ComponentStatus.Draft,
    Separator: ComponentStatus.Beta,
    Skeleton: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Textarea: ComponentStatus.Draft,
  },
  headless: {
    Accordion: ComponentStatus.Beta,
    Carousel: ComponentStatus.Draft,
    Collapsible: ComponentStatus.Beta,
    Combobox: ComponentStatus.Beta,
    Label: ComponentStatus.Draft,
    Modal: ComponentStatus.Beta,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Beta,
    Progress: ComponentStatus.Draft,
    Select: ComponentStatus.Beta,
    Separator: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Tooltip: ComponentStatus.Draft,
  },
};
