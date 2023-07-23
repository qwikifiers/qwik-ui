import { component$ } from '@builder.io/qwik';
import { KitName } from 'apps/website/src/_state/kit-name.type';
import { useRootStore } from 'apps/website/src/_state/use-root-store';
import { BadgeStatus } from '../../../../_state/component-statuses';
import { useSelectedKit } from '../../use-selected-kit';
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
  isSidebarOpenedSig?: boolean;
}

export const DocsNavigation = component$(({ linksGroups }: DocsNavigationProps) => {
  const rootStore = useRootStore();
  const selectedKitSig = useSelectedKit();
  const linkStyles = `px-4 py-2 -ml-4 mr-8 text-xl lg:text-sm flex items-center 
    rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]`;
  return (
    <nav
      class={`flex-col gap-4 fixed top-20 inset-0 z-10 lg:w-80 pb-6
              overflow-y-auto bg-blue-200 dark:bg-indigo-900
              ${rootStore.isSidebarOpened ? 'flex w-100' : 'hidden lg:flex'} `}
    >
      <ul class="show lg:hidden pl-12 mt-8 flex flex-col gap-2">
        <li class={linkStyles}>
          <a href="/about">About</a>
        </li>
        {selectedKitSig.value !== KitName.HEADLESS && (
          <li class={linkStyles}>
            <a href="/docs/headless/introduction">Headless Kit</a>
          </li>
        )}
        {rootStore.featureFlags?.showTailwind &&
          selectedKitSig.value !== KitName.TAILWIND && (
            <li class={linkStyles}>
              <a href="/docs/tailwind/introduction">Tailwind Kit</a>
            </li>
          )}
        <li class={linkStyles}>
          <a href="https://discord.gg/PVWUUejrez" target="_blank">
            Community
          </a>
        </li>
        {/* <a href="/contact">Contact</a> */}
      </ul>
      {linksGroups?.map((group) => {
        return (
          <>
            <h1 class="pl-12 mt-8 font-medium text-3xl lg:text-lg">{group.name}</h1>
            <ul class="pl-12 flex flex-col gap-2">
              {group.children?.map((link) => {
                return (
                  <li class="pl-4" key={link.name + link.href}>
                    <a
                      class={`px-4 py-2 -ml-4 mr-8 text-xl lg:text-sm flex items-center 
                                rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]`}
                      href={link.href}
                    >
                      <div class="flex flex-row gap-2 w-full">
                        <div class="w-48">{link.name}</div>
                        <div class="flex-auto">
                          {link.status && <StatusBadge status={link.status} />}
                        </div>
                      </div>
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
});
