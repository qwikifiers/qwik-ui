import { component$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/tailwind';
import { BadgeStatus } from '../../../../_state/component-statuses';

export interface StatusBadgeProps {
  status: BadgeStatus;
}

export const StatusBadge = component$<StatusBadgeProps>(({ status }) => {
  return (
    <Badge
      class={`text-lg lg:text-xs leading-3 font-medium rounded-full p-3 lg:py-1 lg:px-2 ${
        status === 'Ready'
          ? 'text-green-900 bg-green-300'
          : status === 'Draft'
          ? 'text-amber-900 bg-amber-300'
          : status === 'Planned'
          ? 'text-slate-900 bg-slate-300'
          : null
      }`}
    >
      {status}
    </Badge>
  );
});
