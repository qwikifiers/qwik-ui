import { type PropsOf, component$ } from '@builder.io/qwik';
import { Separator as HeadlessSeparator } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const Separator = component$<PropsOf<typeof HeadlessSeparator>>(
  ({ orientation = 'horizontal', decorative = true, ...props }) => {
    return (
      <>
        <HeadlessSeparator
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
