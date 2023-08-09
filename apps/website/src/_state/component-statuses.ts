import { ComponentStatus } from './component-status.type';

export interface ComponentsStatusesMap {
  [key: string]: ComponentStatus;
}

export type ComponentKitsStatuses = {
  tailwind: ComponentsStatusesMap;
  headless: ComponentsStatusesMap;
};

export const statusByComponent: ComponentKitsStatuses = {
  tailwind: {
    Accordion: ComponentStatus.Planned,
    Alert: ComponentStatus.Planned,
    Badge: ComponentStatus.Planned,
    Breadcrumb: ComponentStatus.Planned,
    Button: ComponentStatus.Planned,
    'Button Group': ComponentStatus.Planned,
    Card: ComponentStatus.Planned,
    Carousel: ComponentStatus.Planned,
    Checkbox: ComponentStatus.Planned,
    Collapse: ComponentStatus.Planned,
    Drawer: ComponentStatus.Planned,
    Input: ComponentStatus.Planned,
    'Input Phone': ComponentStatus.Planned,
    'Navigation Bar': ComponentStatus.Planned,
    Pagination: ComponentStatus.Planned,
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
    Tooltip: ComponentStatus.Planned
  },
  headless: {
    Accordion: ComponentStatus.Beta,
    Autocomplete: ComponentStatus.Draft,
    Carousel: ComponentStatus.Planned,
    Popover: ComponentStatus.Planned,
    Select: ComponentStatus.Draft,
    Tabs: ComponentStatus.Beta,
    Toggle: ComponentStatus.Planned,
    Tooltip: ComponentStatus.Planned
  }
};
