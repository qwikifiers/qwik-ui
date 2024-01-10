import { component$, PropsOf, Slot } from '@builder.io/qwik';

export type NavigationBarProps = PropsOf<'div'>;

export const NavigationBar = component$((props: NavigationBarProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
