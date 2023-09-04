import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { NavigationBar as HeadlessNavigationBar } from '@qwik-ui/headless';

export type HTMLNavigationBarProps = QwikIntrinsicElements['div'];

export const NavigationBar = component$((props: HTMLNavigationBarProps) => {
  const { class: className, ...rest } = props;

  // TODO: discuss this

  return (
    <HeadlessNavigationBar class={['navbar', className]} {...rest}>
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
