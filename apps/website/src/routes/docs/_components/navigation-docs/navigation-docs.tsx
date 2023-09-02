import { component$ } from '@builder.io/qwik';
import { ComponentStatus } from 'apps/website/src/_state/component-status.type';
import { KitName } from 'apps/website/src/_state/kit-name.type';
import { useRootStore } from 'apps/website/src/_state/use-root-store';
import { useSelectedKit } from '../../use-selected-kit';
import { StatusBadge } from '../component-status-badge/component-status-badge';
import { useLocation } from '@builder.io/qwik-city';

export interface LinkGroup {
  name: string;
  children: LinkProps[] | undefined;
}

export interface LinkProps {
  name: string;
  href?: string;
  status?: ComponentStatus;
}

export interface DocsNavigationProps {
  linksGroups?: LinkGroup[];
  isSidebarOpenedSig?: boolean;
}

export const DocsNavigation = component$(({ linksGroups }: DocsNavigationProps) => {
  const location = useLocation();
  const rootStore = useRootStore();
  const selectedKitSig = useSelectedKit();
  const linkStyles = `px-4 py-2 -ml-4 mr-8 text-xl lg:text-sm flex items-center 
    rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]`;
  return (
    <nav
      class={`flex-col gap-4 fixed top-20 inset-0 z-10 lg:w-80 pb-6
              overflow-y-auto bg-slate-100 dark:bg-slate-900
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
            <div class="px-6 pt-6">
              <h2 class="mb-4 font-bold text-white text-3xl lg:text-lg bg-qwikui-blue-400 px-4 py-1 rounded-lg dark:bg-qwikui-purple-500 shadow-dark-low dark:shadow-dark-high border-qwikui-blue-100 dark:border-qwikui-purple-100 border-2">
                {group.name}
              </h2>
              <ul class="flex flex-col gap-2">
                {group.children?.map((link) => {
                  const isLinkActive = location.url.pathname === link.href;
                  return (
                    <li key={link.name + link.href}>
                      <a
                        class={`px-4 py-2 text-xl lg:text-sm flex items-center 
                          rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 ${
                            isLinkActive ? 'font-bold' : ''
                          }`}
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
            </div>
          </>
        );
      })}
    </nav>
  );
});
