/* eslint-disable qwik/no-react-props */
import { Slot, component$ } from '@builder.io/qwik';
import { type ContentMenu, useContent, useLocation } from '@builder.io/qwik-city';
import {
  type ComponentsStatusesMap,
  statusByComponent,
} from '~/_state/component-statuses';
import {
  DocsNavigation,
  type LinkGroup,
  type LinkProps,
} from '~/components/navigation-docs/navigation-docs';
import { MDXProvider } from '~/_state/MDXProvider';
import { components } from '~/components/mdx-components';
import { DashboardTableOfContents } from '~/components/toc/toc';
import Header from '~/components/header/header';

export default component$(() => {
  const { headings } = useContent();
  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />
      <div class="grid justify-center">
        <div class="grid w-full max-w-screen-2xl grid-cols-[minmax(0,1fr)] lg:grid-cols-[288px_minmax(0,1fr)] xl:grid-cols-[288px_minmax(0,968px)_240px] 2xl:gap-16">
          <DocsNavigation
            linksGroups={
              menuItemsGroups && menuItemsGroups.length > 0 ? menuItemsGroups : undefined
            }
            class="sticky top-16 mr-4 hidden h-[calc(100vh-64px)] overflow-auto lg:block 2xl:ml-0"
          />
          <MDXProvider components={components}>
            <main data-pagefind-body class="px-4 py-8">
              <Slot />
            </main>
          </MDXProvider>
          <div class="mx-6 hidden text-sm xl:block">
            <div class="fixed translate-y-[-20px] py-12">
              <div class="toc-scrollbar mb-4 h-[calc(100vh-64px)] overflow-auto pb-16">
                <DashboardTableOfContents headings={headings ? headings : []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export function useKitMenuItems() {
  const location = useLocation();
  const { menu } = useContent();
  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (location.url.pathname.startsWith('/docs/headless')) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.headless,
    );
  }

  if (location.url.pathname.startsWith('/docs/styled')) {
    menuItemsGroups = decorateMenuItemsWithBadges(menu?.items, statusByComponent.styled);
  }

  return { menuItemsGroups };
}

function decorateMenuItemsWithBadges(
  menuItems: ContentMenu[] | undefined,
  kitStatusesMap: ComponentsStatusesMap,
): LinkGroup[] | undefined {
  return menuItems?.map((item) => {
    return {
      name: item.text,
      children: item.items?.map((child) => {
        const link: LinkProps = {
          name: child.text,
          href: child.href,
        };
        if (kitStatusesMap[link.name]) {
          link.status = kitStatusesMap[link.name];
        }
        return link;
      }),
    };
  });
}
