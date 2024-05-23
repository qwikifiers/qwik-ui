import { component$ } from '@builder.io/qwik';
import { Badge } from '~/components/ui';
import { ComponentStatus } from '~/_state/component-status.type';

export interface StatusBadgeProps {
  status: ComponentStatus;
}

export function getVariantByStatus(status: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Beta:
      return 'primary';
    case ComponentStatus.Draft:
      return 'outline';
    default:
      return null;
  }
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return <Badge look={getVariantByStatus(status)}>{status}</Badge>;
});
