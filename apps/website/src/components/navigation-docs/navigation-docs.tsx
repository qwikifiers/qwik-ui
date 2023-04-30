import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import {
  BadgeStatus,
  StatusBadge,
} from '../component-status-badge/component-status-badge';

const components: { name: string; status: BadgeStatus }[] = [
  { name: 'Accordion', status: 'Planned' },
  { name: 'Alert', status: 'Planned' },
  { name: 'Badge', status: 'Planned' },
  { name: 'Breadcrumb', status: 'Planned' },
  { name: 'Button', status: 'Planned' },
  { name: 'Button Group', status: 'Planned' },
  { name: 'Card', status: 'Planned' },
  { name: 'Carousel', status: 'Planned' },
  { name: 'Checkbox', status: 'Planned' },
  { name: 'Collapse', status: 'Planned' },
  { name: 'Drawer', status: 'Planned' },
  { name: 'Input', status: 'Planned' },
  { name: 'Input Phone', status: 'Planned' },
  { name: 'Navigation Bar', status: 'Planned' },
  { name: 'Pagination', status: 'Planned' },
  { name: 'Popover', status: 'Planned' },
  { name: 'Progress', status: 'Planned' },
  { name: 'Radio', status: 'Planned' },
  { name: 'Rating', status: 'Planned' },
  { name: 'Select', status: 'Planned' },
  { name: 'Slider', status: 'Planned' },
  { name: 'Spinner', status: 'Planned' },
  { name: 'Tabs', status: 'Planned' },
  { name: 'Toast', status: 'Planned' },
  { name: 'Toggle', status: 'Planned' },
  { name: 'Tooltip', status: 'Planned' },
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
                <StatusBadge status={component.status} />
              </Link>
            </li>
          ))}
      </ol>
    </nav>
  );
});
