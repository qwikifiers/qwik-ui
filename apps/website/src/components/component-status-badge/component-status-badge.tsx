import { component$ } from '@builder.io/qwik';
import { Badge } from '@qwik-ui/headless';

export type StatusBadgeProps = 'Ready' | 'Draft' | 'Planned';

export const StatusBadge = component$<StatusBadgeProps>((status) => {
  return (
    <Badge
      class={`ml-auto text-xs leading-3 font-medium rounded-full py-1 px-2 ${
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
