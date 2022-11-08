import {component$, Slot} from "@builder.io/qwik";
import {ResponsiveSize} from "../../types/types";

interface KbdProps {
  size?: ResponsiveSize;
}

export const Kbd = component$(({ size = "md", ...props }: KbdProps ) => {
  return (
    <kbd class={`kbd ${size ? `kbd-${size}` : ''}`} {...props}><Slot /></kbd>
  );
});
