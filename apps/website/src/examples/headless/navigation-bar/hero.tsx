import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { NavigationBar } from '@qwik-ui/headless';
import styles from './navigation-bar.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <h2>This is the documentation for the Navigation Bar</h2>

      <div class="mt-4 flex flex-col gap-8">
        <h2>Basic Example</h2>

        <NavigationBar class="navigation-bar bg-base-100 flex w-full items-center rounded-lg">
          <div class="navigation-bar__start flex">
            <a class="btn btn-ghost text-xl normal-case ">tailwindUI</a>
          </div>
          <div class="navigation-bar__end flex">
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
                <ul class="bg-base-100 p-2">
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
