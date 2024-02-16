import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type CheckboxProps = QwikIntrinsicElements['input'];

const Checkbox = component$<CheckboxProps>(({ name, ...props }) => {
  return (
    <div>
      <input
        type="checkbox"
        {...props}
        class={cn(
          'border-primary text-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )}
        name={name}
        id={name}
      />
    </div>
  );
});

export { Checkbox };
