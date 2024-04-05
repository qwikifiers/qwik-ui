import { component$, Slot, PropsOf } from '@builder.io/qwik';
import { Label as QwikUILabel } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

type LabelProps = PropsOf<'label'>;

export const Label = component$<LabelProps>((props) => {
  return (
    <QwikUILabel
      {...props}
      class={cn(
        'font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )}
    >
      <Slot />
    </QwikUILabel>
  );
});
