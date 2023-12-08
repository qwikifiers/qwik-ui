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
    Accordion: ComponentStatus.Planned,
    Alert: ComponentStatus.Planned,
    Badge: ComponentStatus.Planned,
    Breadcrumb: ComponentStatus.Planned,
    Button: ComponentStatus.Beta,
    'Button Group': ComponentStatus.Planned,
    Card: ComponentStatus.Planned,
    Carousel: ComponentStatus.Planned,
    Checkbox: ComponentStatus.Planned,
    Combobox: ComponentStatus.Planned,
    Drawer: ComponentStatus.Planned,
    Input: ComponentStatus.Planned,
    'Input Phone': ComponentStatus.Planned,
    'Navigation Bar': ComponentStatus.Planned,
    Modal: ComponentStatus.Planned,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Planned,
    Progress: ComponentStatus.Planned,
    Radio: ComponentStatus.Planned,
    Rating: ComponentStatus.Planned,
    Select: ComponentStatus.Planned,
    Slider: ComponentStatus.Planned,
    Spinner: ComponentStatus.Planned,
    Tabs: ComponentStatus.Planned,
    Toast: ComponentStatus.Planned,
    Toggle: ComponentStatus.Planned,
    Tooltip: ComponentStatus.Planned,
  },
  headless: {
    Accordion: ComponentStatus.Beta,
    Carousel: ComponentStatus.Planned,
    Combobox: ComponentStatus.Beta,
    Dialog: ComponentStatus.Planned,
    Modal: ComponentStatus.Beta,
    Pagination: ComponentStatus.Draft,
    Popover: ComponentStatus.Draft,
    Select: ComponentStatus.Draft,
    Separator: ComponentStatus.Beta,
    Tabs: ComponentStatus.Beta,
    Toggle: ComponentStatus.Planned,
    Tooltip: ComponentStatus.Draft,
  },
};
