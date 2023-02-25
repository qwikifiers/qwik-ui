import { component$, $, useStylesScoped$ } from '@builder.io/qwik';
import { NavigationBar } from '@qwik-ui/headless';

export default component$(() => {
  useStylesScoped$(`
    .panel {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }`);

  return (
    <>
      <h2>This is the documentation for the Navigation Bar</h2>

      <div class="flex flex-col gap-8 mt-4">
        <h2>Basic Example</h2>

        <NavigationBar class="navbar bg-base-100 rounded-lg">
          <div class="navbar-start">
            <a class="btn btn-ghost normal-case text-xl ">daisyUI</a>
          </div>
          <div class="navbar-end">
            <ul class="menu  menu-horizontal px-1 ">
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a>
                  Parent
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul class="p-2 bg-base-100">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        </NavigationBar>
      </div>
    </>
  );
});
