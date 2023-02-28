import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { NavigationBar as HeadlessNavigationBar } from '@qwik-ui/headless';
import { clsq } from '@qwik-ui/shared';

export type HTMLNavigationBarProps = QwikIntrinsicElements['div'];

export const NavigationBar = component$((props: HTMLNavigationBarProps) => {
  const { class: className, ...rest } = props;

  return (
    <HeadlessNavigationBar class={clsq('navbar', className)} {...rest}>
      <div class="navbar-start">
        <Slot name="navbar-left" />
      </div>
      <div class="navbar-center">
        <Slot name="navbar-center" />
      </div>
      <div class="navbar-end">
        <Slot name="navbar-right" />
      </div>
    </HeadlessNavigationBar>
  );
});
