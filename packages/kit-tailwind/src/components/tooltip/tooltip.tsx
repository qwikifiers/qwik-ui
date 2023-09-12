import { component$, Slot } from '@builder.io/qwik';
import {
  Tooltip as TooltipHeadless,
  TooltipProps as TooltipHeadlessProps,
} from '@qwik-ui/headless';

export type TooltipProps = TooltipHeadlessProps;

export const Tooltip = component$((props: TooltipProps) => {
  return (
    <TooltipHeadless
      {...props}
      class={
        'z-[99] inline-block rounded-lg bg-black p-2 text-white ' + (props.class || '')
      }
    >
      <Slot />
    </TooltipHeadless>
  );
});
