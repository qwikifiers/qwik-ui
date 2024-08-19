import { PropsOf, component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ComponentStatus } from '~/_state/component-status.type';
import { StatusBadge } from '../component-status-badge/component-status-badge';
import { cn } from '@qwik-ui/utils';
import { buttonVariants } from '@qwik-ui/styled';

export interface LinkGroup {
  name: string;
  children: LinkProps[] | undefined;
}

export interface LinkProps {
  name: string;
  href?: string;
  status?: ComponentStatus;
}

export type DocsNavigationProps = PropsOf<'nav'> & {
  linksGroups?: LinkGroup[];
  isSidebarOpenedSig?: boolean;
};

const defaultLinksGroups: LinkGroup[] = [
  {
    name: 'Qwik UI',
    children: [
      {
        name: 'Contributing',
        href: '/docs/contributing/',
      },
      {
        name: 'Headless',
        href: '/docs/headless/introduction/',
      },
      {
        name: 'Styled',
        href: '/docs/styled/introduction/',
      },
    ],
  },
];

export const DocsNavigation = component$(
  ({ linksGroups = defaultLinksGroups, ...props }: DocsNavigationProps) => {
    const location = useLocation();

    return (
      <nav {...props} class={cn('navigation-docs flex-col gap-4 pb-6', props.class)}>
        {linksGroups?.map((group) => {
          return (
            <div class="px-6 pt-8" key={group.name}>
              <h2 class="mb-2 border-b-2 p-2 text-lg font-bold">{group.name}</h2>
              <ul class="flex flex-col gap-2">
                {group.children?.map((link) => {
                  const isLinkActive = location.url.pathname === link.href;
                  return (
                    <li key={link.name + link.href}>
                      <a
                        class={cn(
                          buttonVariants({ look: 'ghost' }),
                          'flex h-10 items-center rounded-base font-sans',
                          isLinkActive ||
                            (location.url.pathname?.startsWith('/docs/headless/') &&
                              link.name === 'Headless') ||
                            (location.url.pathname?.startsWith('/docs/styled/') &&
                              link.name === 'Styled')
                            ? 'bg-accent font-bold text-accent-foreground'
                            : 'font-normal',
                        )}
                        href={link.href}
                      >
                        <div class="flex w-full items-center justify-between">
                          <div>{link.name}</div>
                          {link.status && <StatusBadge status={link.status} />}
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    );
  },
);
