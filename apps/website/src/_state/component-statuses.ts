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
    Checkbox: ComponentStatus.Draft,
    Dropdown: ComponentStatus.Draft,
    RadioGroup: ComponentStatus.Draft,
    Carousel: ComponentStatus.Draft,
    Tooltip: ComponentStatus.Draft,
  },
  headless: {
    Checkbox: ComponentStatus.Draft,
    Dropdown: ComponentStatus.Draft,
    Pagination: ComponentStatus.Draft,
  },
};
