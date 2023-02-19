import { component$, Slot } from '@builder.io/qwik';
import { Menu } from '../../components/menu/menu';

export default component$(() => {
  return (
    <>
      <section class="layout block lg:grid">
        <div class="sidebar hidden lg:block">
          <Menu />
        </div>
        <div class="px-8 py-4">
          <Slot />
        </div>
      </section>
    </>
  );
});
