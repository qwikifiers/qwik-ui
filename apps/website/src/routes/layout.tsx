/* eslint-disable qwik/no-react-props */
import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { ContentMenu, useContent, useLocation } from '@builder.io/qwik-city';
import { ComponentsStatusesMap, statusByComponent } from '~/_state/component-statuses';
import Header from '~/components/header/header';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from '~/components/navigation-docs/navigation-docs';
import docsStyles from './docs.css?inline';
import { MDXProvider } from '~/_state/MDXProvider';
import { components } from '~/components/mdx-components';
import { DashboardTableOfContents } from '~/components/toc/toc';
import { ScrollArea } from '@qwik-ui/styled';

export default component$(() => {
  const { headings } = useContent();

  useStyles$(docsStyles);

  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />
      <MDXProvider components={components}>
        <div class="flex justify-around lg:justify-around 2xl:justify-center 2xl:space-x-16">
          <DocsNavigation
            linksGroups={menuItemsGroups}
            class="sticky top-16 ml-4 hidden h-[calc(100vh-64px)] min-w-72 overflow-auto lg:flex 2xl:ml-0"
          />
          <main class="w-full px-2 py-8 sm:px-8 lg:px-16 2xl:max-w-4xl">
            <Slot />
          </main>
          <div class="hidden w-64 min-w-64 text-sm xl:block">
            <div class="sticky top-16 -mt-10 mr-8 pt-4">
              <ScrollArea className="pb-10">
                <div class="sticky top-16 -mt-10 h-[calc(100vh-64px)] py-12">
                  <DashboardTableOfContents headings={headings ? headings : []} />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </MDXProvider>
      <footer></footer>
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
