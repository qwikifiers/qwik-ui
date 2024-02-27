/* eslint-disable qwik/no-react-props */
import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { ContentMenu, useContent } from '@builder.io/qwik-city';
import { ComponentsStatusesMap, statusByComponent } from '~/_state/component-statuses';
import { KitName } from '~/_state/kit-name.type';
import Header from '~/components/header/header';
import {
  DocsNavigation,
  LinkGroup,
  LinkProps,
} from '~/components/navigation-docs/navigation-docs';
import docsStyles from './docs.css?inline';
import { useSelectedKit } from './docs/use-selected-kit';
import prismStyles from './prism.css?inline';

import '@fontsource-variable/inter';
import { MDXProvider } from '~/_state/MDXProvider';
import { components } from '~/components/mdx-components';
import { DashboardTableOfContents } from '~/components/toc/toc';
import { ScrollArea } from '@qwik-ui/styled';

export default component$(() => {
  const { headings } = useContent();

  useStyles$(prismStyles);
  useStyles$(docsStyles);

  const { menuItemsGroups } = useKitMenuItems();

  return (
    <>
      <Header showBottomBorder={true} showVersion={true} />
      <MDXProvider components={components}>
        <div class="flex justify-around lg:justify-around lg:space-x-10 2xl:justify-center 2xl:space-x-24">
          <DocsNavigation
            linksGroups={menuItemsGroups}
            class=" sticky top-16 hidden h-[calc(100vh-64px)] min-w-72 overflow-auto lg:flex"
          />
          <main class="w-full max-w-3xl px-4 py-8 sm:px-8">
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
  const selectedKitSig = useSelectedKit();
  const { menu } = useContent();
  let menuItemsGroups: LinkGroup[] | undefined = [];

  if (selectedKitSig.value === KitName.HEADLESS) {
    menuItemsGroups = decorateMenuItemsWithBadges(
      menu?.items,
      statusByComponent.headless,
    );
  }

  if (selectedKitSig.value === KitName.STYLED) {
    menuItemsGroups = decorateMenuItemsWithBadges(menu?.items, statusByComponent.styled);
  }

  return {
    menuItemsGroups,
  };
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
