import { component$ } from '@builder.io/qwik';
import { Drawer } from '@qwik-ui/theme-daisy';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Drawer</h2>
      <Drawer drawerId="my-drawer" label="Open it pls!">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <a href="/" target="_blank">
              Homepage
            </a>
          </li>
          <li>
            <a href="https://github.com/qwikifiers/qwik-ui" target="_blank">
              QwikUI
            </a>
          </li>
          <li>
            <a href="https://qwik.builder.io/" target="_blank">
              Qwik
            </a>
          </li>
        </ul>
      </Drawer>
    </>
  );
});
