import { ComponentStatus } from './component-status.type';

export const tooltipByStatus = {
  [ComponentStatus.Ready]: 'This component is ready production.',
  [ComponentStatus.Beta]:
    'This component is ready for production, but the API might change.',
  [ComponentStatus.Draft]:
    'This component is still in development and may have bugs or missing features.',
  [ComponentStatus.Planned]: 'This component is planned for development.'
};
