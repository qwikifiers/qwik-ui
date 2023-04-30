import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import {
  StatusBadge,
  StatusBadgeProps,
} from '../component-status-badge/component-status-badge';

const components: { name: string; status: StatusBadgeProps }[] = [
  { name: 'Accordion', status: 'Ready' },
  { name: 'Alert', status: 'Ready' },
  { name: 'Badge', status: 'Ready' },
  { name: 'Breadcrumb', status: 'Ready' },
  { name: 'Button', status: 'Ready' },
  { name: 'Button Group', status: 'Ready' },
  { name: 'Card', status: 'Ready' },
  { name: 'Carousel', status: 'Ready' },
  { name: 'Checkbox', status: 'Ready' },
  { name: 'Collapse', status: 'Ready' },
  { name: 'Drawer', status: 'Ready' },
  { name: 'Input', status: 'Ready' },
  { name: 'Input Phone', status: 'Ready' },
  { name: 'Navigation Bar', status: 'Ready' },
  { name: 'Pagination', status: 'Ready' },
  { name: 'Popover', status: 'Ready' },
  { name: 'Progress', status: 'Ready' },
  { name: 'Radio', status: 'Ready' },
  { name: 'Rating', status: 'Ready' },
  { name: 'Select', status: 'Ready' },
  { name: 'Slider', status: 'Ready' },
  { name: 'Spinner', status: 'Ready' },
  { name: 'Tabs', status: 'Ready' },
  { name: 'Toast', status: 'Ready' },
  { name: 'Toggle', status: 'Ready' },
  { name: 'Tooltip', status: 'Ready' },
];

export const DocsNavigation = component$(() => {
  return (
    <nav class="hidden lg:flex flex-col gap-4 fixed h-full overflow-y-auto pt-20 bg-blue-200 dark:bg-indigo-900 w-80">
      <h1 class="pl-12 mt-8 font-medium text-lg">Getting started</h1>
      <ul class="pl-12 flex flex-col gap-2">
        <li class="pl-4">
          <Link
            class="px-4 py-2 -ml-4 mr-8 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
            href="/docs"
          >
            Introduction
          </Link>
        </li>
        <li class="pl-4">
          <Link
            class="px-4 py-2 -ml-4 mr-8 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
            href="/install"
          >
            Installation
          </Link>
        </li>
        <li class="pl-4">
          <Link
            class="px-4 py-2 -ml-4 mr-8 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
            href="/usage"
          >
            Usage
          </Link>
        </li>
        <li class="pl-4">
          <Link
            class="px-4 py-2 -ml-4 mr-8 text-sm block rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
            href="/contributing"
          >
            Contributing
          </Link>
        </li>
      </ul>
      <h1 class="pl-12 font-medium text-lg">
        <Link
          class="hover:text-[var(--qwik-light-blue)] dark:hover:text-[var(--qwik-light-purple)]"
          href="/components"
        >
          Components
        </Link>
      </h1>
      <ol class="pl-12 pb-6 flex flex-col gap-2 w-full">
        {components
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((component, index) => (
            <li class="pl-4" key={index}>
              <Link
                class="px-4 py-2 -ml-4 mr-8 text-sm flex items-center rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
                href={`/docs/headless/${component.name
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {component.name}
                {/* <StatusBadge status={component.status} /> */}
              </Link>
            </li>
          ))}
      </ol>
    </nav>
  );
});
