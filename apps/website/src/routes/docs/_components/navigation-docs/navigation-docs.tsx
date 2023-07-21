import { component$ } from '@builder.io/qwik';
import { BadgeStatus } from '../../../../_state/component-statuses';
import { StatusBadge } from '../component-status-badge/component-status-badge';

export interface LinkGroup {
  name: string;
  children: LinkProps[] | undefined;
}

export interface LinkProps {
  name: string;
  href?: string;
  status?: BadgeStatus;
}

export interface DocsNavigationProps {
  linksGroups?: LinkGroup[];
}

export const DocsNavigation = component$(
  ({ linksGroups }: DocsNavigationProps) => {
    return (
      <nav class="hidden lg:flex flex-col gap-4 fixed top-20 inset-0 overflow-y-auto bg-blue-200 dark:bg-indigo-900 w-80">
        {linksGroups?.map((group) => {
          return (
            <>
              <h1 class="pl-12 mt-8 font-medium text-lg">{group.name}</h1>
              <ul class="pl-12 flex flex-col gap-2">
                {group.children?.map((link) => {
                  return (
                    <li class="pl-4" key={link.name + link.href}>
                      <a
                        class="px-4 py-2 -ml-4 mr-8 text-sm flex items-center rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]"
                        href={link.href}
                      >
                        {link.name}{' '}
                        {link.status && <StatusBadge status={link.status} />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
      </nav>
    );
  }
);
