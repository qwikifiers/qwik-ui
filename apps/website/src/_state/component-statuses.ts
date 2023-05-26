export type BadgeStatus = 'Ready' | 'Draft' | 'Planned';

export interface ComponentsStatusesMap {
  [key: string]: BadgeStatus;
}

export type ComponentKitsStatuses = {
  tailwind: ComponentsStatusesMap;
  headless: ComponentsStatusesMap;
};

export const componentsStatuses: ComponentKitsStatuses = {
  tailwind: {
    Accordion: 'Planned',
    Alert: 'Planned',
    Badge: 'Planned',
    Breadcrumb: 'Planned',
    Button: 'Planned',
    'Button Group': 'Planned',
    Card: 'Planned',
    Carousel: 'Planned',
    Checkbox: 'Planned',
    Collapse: 'Planned',
    Drawer: 'Planned',
    Input: 'Planned',
    'Input Phone': 'Planned',
    'Navigation Bar': 'Planned',
    Pagination: 'Planned',
    Popover: 'Planned',
    Progress: 'Planned',
    Radio: 'Planned',
    Rating: 'Planned',
    Select: 'Planned',
    Slider: 'Planned',
    Spinner: 'Planned',
    Tabs: 'Planned',
    Toast: 'Planned',
    Toggle: 'Planned',
    Tooltip: 'Planned',
  },
  headless: {
    Accordion: 'Planned',
    Badge: 'Planned',
    Carousel: 'Planned',
    Select: 'Draft',
    Tabs: 'Planned',
    Toggle: 'Planned',
    Tooltip: 'Planned',
  },
};
