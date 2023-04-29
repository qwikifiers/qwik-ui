import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

const components = [
  'Accordion',
  'Alert',
  'Badge',
  'Breadcrumb',
  'Button',
  'Button Group',
  'Card',
  'Carousel',
  'Checkbox',
  'Collapse',
  'Drawer',
  'Input',
  'Input Phone',
  'Navigation Bar',
  'Pagination',
  'Popover',
  'Progress',
  'Radio',
  'Rating',
  'Select',
  'Slider',
  'Spinner',
  'Tabs',
  'Toast',
  'Toggle',
  'Tooltip',
];

export const DocsNavigation = component$(() => {
  return (
    <nav class="sm:flex flex-col gap-4 fixed h-full pt-20 pb-6 bg-blue-900 w-80 hidden">
      <h1 class="pl-12 mt-8 font-medium text-lg">Getting started</h1>
      <ul class="pl-12 flex flex-col gap-2">
        <li>
          <Link
            class="px-4 py-2 -ml-4 mr-4 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)]"
            href="/docs"
          >
            Introduction
          </Link>
        </li>
        <li>
          <Link
            class="px-4 py-2 -ml-4 mr-4 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)]"
            href="/install"
          >
            Installation
          </Link>
        </li>
        <li>
          <Link
            class="px-4 py-2 -ml-4 mr-4 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)]"
            href="/usage"
          >
            Usage
          </Link>
        </li>
        <li>
          <Link
            class="px-4 py-2 -ml-4 mr-4 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)]"
            href="/contributing"
          >
            Contributing
          </Link>
        </li>
      </ul>
      <h1 class="pl-12 font-medium text-lg">
        <Link class="hover:text-[var(--qwik-light-blue)]" href="/components">
          Components
        </Link>
      </h1>
      <ol class="pl-12 flex flex-col gap-2 w-full h-full overflow-y-auto">
        {components
          .sort((a, b) => (a > b ? 1 : -1))
          .map((component, index) => (
            <li key={index}>
              <Link
                class="px-4 py-2 -ml-4 mr-4 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)]"
                href={`/docs/headless/${component
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {component}
              </Link>
            </li>
          ))}
      </ol>
    </nav>
  );
});
