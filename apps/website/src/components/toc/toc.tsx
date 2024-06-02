import { component$ } from '@builder.io/qwik';
import { ContentHeading } from '@builder.io/qwik-city';
import { TableOfContent } from '@qwik-ui/headless';

export const DashboardTableOfContents = component$(
  ({ headings }: { headings: ContentHeading[] }) => {
    if (headings.length === 0) {
      return null;
    }

    return (
      <div class="space-y-2">
        <div class="font-medium">On This Page</div>
        <TableOfContent headings={headings} />
      </div>
    );
  },
);
