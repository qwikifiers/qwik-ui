import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { NavigationBar } from '@qwik-ui/headless';
export type NavigationBarProps = PropsOf<'div'>;

export const NavigationBar = component$((props: NavigationBarProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
