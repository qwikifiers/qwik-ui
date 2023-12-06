import { component$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/tailwind';
import { ComponentStatus } from '~/_state/component-status.type';
import { tooltipByStatus } from '~/_state/status-tooltips';

export interface StatusBadgeProps {
  status: ComponentStatus;
}

export function getClassByStatus(status: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Ready:
      return 'text-green-900 bg-green-300 tracking-wide';
    case ComponentStatus.Beta:
      return 'border border-primary-foreground tracking-wide bg-primary text-primary-foreground';
    case ComponentStatus.Draft:
      return ' border  tracking-wide bg-muted text-foreground';
    case ComponentStatus.Planned:
      return ' border tracking-wide';
    default:
      return null;
  }
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return (
    <Badge
      title={tooltipByStatus[status]}
      class={`rounded-lg p-3 text-lg font-bold leading-3 shadow lg:px-2 lg:py-1 lg:text-xs
      ${getClassByStatus(status)}`}
    >
      {status}
    </Badge>
  );
});
