import { component$ } from '@builder.io/qwik';
import { NavigationBar } from '@qwik-ui/tailwind';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Navigation Bar</h2>

      <div class="mt-4 flex flex-col gap-8">
        <h2>Basic Example</h2>

        <NavigationBar class="bg-base-100 rounded-lg">
          <a href="#" q:slot="navbar-left" class="btn btn-ghost text-xl normal-case">
            tailwindUI
          </a>
          <ul q:slot="navbar-center" class="menu  menu-horizontal px-1">
            <li>
              <a href="#">Item 1</a>
            </li>
            <li tabIndex={0}>
              <a href="#">
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
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
          <a q:slot="navbar-right" class="btn btn-ghost text-xl normal-case">
            tailwindUI
          </a>
        </NavigationBar>

        <NavigationBar class="bg-base-100 rounded-lg">
          <a q:slot="navbar-left" class="btn btn-ghost text-xl normal-case">
            tailwindUI
          </a>
          <ul q:slot="navbar-right" class="menu  menu-horizontal px-1">
            <li>
              <a href="#">Item 1</a>
            </li>
            <li tabIndex={0}>
              <a href="#">
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
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </NavigationBar>
        <h2>Custom css</h2>
        <NavigationBar class=" bg-primary rounded-lg">
          <a q:slot="navbar-left" class="btn btn-ghost text-xl normal-case">
            tailwindUI
          </a>
          <ul q:slot="navbar-right" class="menu   menu-horizontal px-1">
            <li>
              <a href="#">Item 1</a>
            </li>
            <li tabIndex={0}>
              <a href="#">
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
                  <a href="#">Submenu 1</a>
                </li>
                <li>
                  <a href="#">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </NavigationBar>
      </div>
    </>
  );
});
