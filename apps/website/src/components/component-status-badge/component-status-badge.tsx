import { component$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/fluffy';
import { ComponentStatus } from '~/_state/component-status.type';

export interface StatusBadgeProps {
  status: ComponentStatus;
}

export function getClassByStatus(status: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Beta:
      return 'secondary';
    case ComponentStatus.Draft:
      return 'primary';
    case ComponentStatus.Planned:
      return 'outline';
    default:
      return null;
  }
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return <Badge variant={getClassByStatus(status)}>{status}</Badge>;
});
