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
      return 'text-green-900 bg-green-300 tracking-wide';
    case ComponentStatus.Beta:
      return 'dark:text-slate-100 dark:bg-qwikui-purple-500 bg-qwikui-blue-500 text-white dark:border-qwikui-purple-600 border-[1px] border-qwikui-blue-700 tracking-wide shadow-dark-low dark:shadow-dark-low text-outline-beta';
    case ComponentStatus.Draft:
      return 'text-slate-200 bg-slate-700 dark:bg-slate-800 border-[1px] border-slate-400 shadow-dark-low tracking-wide dark:shadow-dark-low text-outline-draft';
    case ComponentStatus.Planned:
      return 'text-white bg-slate-300 border-[1px] border-slate-500 dark:border-slate-400 tracking-wide shadow-dark-low dark:shadow-dark-low text-outline-planned';
    default:
      return null;
  }
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return (
    <Badge
      title={tooltipByStatus[status]}
      class={`rounded-lg p-3 text-lg font-medium leading-3 lg:px-2 lg:py-1 lg:text-xs 
      ${getClassByStatus(status)}`}
    >
      {status}
    </Badge>
  );
});
