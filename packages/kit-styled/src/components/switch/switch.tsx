import { type PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';


export const Switch = component$<PropsOf<'input'>>(({ ...props }) => {
  return (
    <div>
      sdsd
      <input
            type="checkbox"
            {...props}
            class={cn('h-4 w-4 accent-primary disabled:cursor-not-allowed disabled:opacity-50', props.class)}
          />
    </div>

  );
});
