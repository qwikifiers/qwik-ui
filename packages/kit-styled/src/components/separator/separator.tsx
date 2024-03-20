import { PropsOf, component$ } from '@builder.io/qwik';
import { Separator as QwikUISeparator } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const Separator = component$<PropsOf<typeof QwikUISeparator>>(
  ({ orientation = 'horizontal', decorative = true, ...props }) => {
    return (
      <>
        <QwikUISeparator
          {...props}
          decorative={decorative}
          orientation={orientation}
          class={cn(
            'shrink-0 bg-border',
            orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
            props.class,
          )}
        />
      </>
    );
  },
);
