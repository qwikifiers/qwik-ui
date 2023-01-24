import { component$, Slot } from '@builder.io/qwik';
import {
  Tooltip as TooltipHeadless,
  TooltipProps as TooltipHeadlessProps,
} from '@qwik-ui/headless';

export type TooltipProps = TooltipHeadlessProps;

export const Tooltip = component$((props: TooltipProps) => {
  return (
    <TooltipHeadless
      durationMs={100}
      {...props}
      class={
        'inline-block bg-black text-white p-2 rounded-lg z-[99] ' +
        (props.class || '')
      }
    >
      <Slot />
    </TooltipHeadless>
  );
});
