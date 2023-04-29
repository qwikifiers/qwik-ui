import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type NavigationBarProps = QwikIntrinsicElements['div'];

export const NavigationBar = component$((props: NavigationBarProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
