import { component$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/tailwind';
import { ComponentStatus } from '../../../../_state/component-status.type';
import { tooltipByStatus } from '../../../../_state/status-tooltips';

export interface StatusBadgeProps {
  status: ComponentStatus;
}

export function getClassByStatus(status: ComponentStatus) {
  switch (status) {
    case ComponentStatus.Ready:
      return 'text-green-900 bg-green-300';
    case ComponentStatus.Beta:
      return 'dark:text-blue-900 dark:bg-blue-300 bg-purple-300 text-purple-900';
    case ComponentStatus.Draft:
      return 'text-amber-900 bg-amber-300';
    case ComponentStatus.Planned:
      return 'text-slate-900 bg-slate-300';
    default:
      return null;
  }
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return (
    <Badge
      title={tooltipByStatus[status]}
      class={`text-lg lg:text-xs leading-3 font-medium rounded-full p-3 lg:py-1 lg:px-2 
      ${getClassByStatus(status)}`}
    >
      {status}
    </Badge>
  );
});
