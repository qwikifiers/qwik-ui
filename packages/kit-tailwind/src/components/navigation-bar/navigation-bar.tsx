import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { NavigationBar as HeadlessNavigationBar } from '@qwik-ui/headless';
import type { OmitSignalClass } from '@qwik-ui/utils';

export type HTMLNavigationBarProps = OmitSignalClass<QwikIntrinsicElements['div']>;

export const NavigationBar = component$((props: HTMLNavigationBarProps) => {
  const { class: className, ...rest } = props;

  return (
    /* @ts-expect-error ignore because deprecated */
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
