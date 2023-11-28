import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ComponentStatus } from 'apps/website/src/_state/component-status.type';
import { KitName } from 'apps/website/src/_state/kit-name.type';
import { useAppState } from 'apps/website/src/_state/use-app-state';
import { StatusBadge } from '../component-status-badge/component-status-badge';
import { useSelectedKit } from '../../routes/docs/use-selected-kit';

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
  const rootStore = useAppState();
  const selectedKitSig = useSelectedKit();
  const linkStyles = `px-4 py-2 -ml-4 mr-8 text-xl lg:text-sm flex items-center 
    rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]`;
  return (
    <nav
      class={`fixed inset-0 top-20 z-10 flex-col gap-4 overflow-y-auto border-r-[1px] border-slate-200
              bg-white pb-6 [grid-area:nav] dark:border-slate-800 dark:bg-slate-900  lg:w-80
              ${rootStore.isSidebarOpened ? 'w-100 flex' : 'hidden lg:flex'} `}
    >
      <ul class="show mt-8 flex flex-col gap-2 pl-12 lg:hidden">
        <li class={linkStyles}>
          <a href="/about">About</a>
        </li>
        {selectedKitSig.value !== KitName.HEADLESS && (
          <li class={linkStyles}>
            <a href="/docs/headless/introduction">Headless Kit</a>
          </li>
        )}
        {rootStore.featureFlags?.showFluffy &&
          selectedKitSig.value !== KitName.FLUFFY && (
            <li class={linkStyles}>
              <a href="/docs/fluffy/introduction">Styled Kit</a>
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
            <div class="px-6 pt-8">
              <h2 class="bg-qwikui-blue-600 dark:bg-qwikui-purple-800 shadow-dark-low dark:shadow-dark-high border-qwikui-blue-100 dark:border-qwikui-purple-100 text-outline-lg mb-4 rounded-lg border-2 px-4 py-1 text-3xl font-bold  text-white lg:text-lg">
                {group.name}
              </h2>
              <ul class="flex flex-col gap-2">
                {group.children?.map((link) => {
                  const isLinkActive = location.url.pathname === link.href;
                  return (
                    <li key={link.name + link.href}>
                      <a
                        class={`transition-color ease-step flex items-center rounded-lg px-4 py-2 text-xl text-slate-600 duration-300 hover:bg-slate-100 hover:text-slate-950
                          focus:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:text-white lg:text-sm ${
                            isLinkActive
                              ? 'font-bold !text-slate-950 dark:!text-white'
                              : ''
                          }`}
                        href={link.href}
                      >
                        <div class="flex w-full flex-row gap-2">
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
