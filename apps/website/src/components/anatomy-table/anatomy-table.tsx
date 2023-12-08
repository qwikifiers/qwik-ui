import { component$ } from '@builder.io/qwik';
import {} from '@qwik-ui/headless';

type AnatomyTableProps = {
  firstColumnLabel?: string;
  propDescriptors: {
    name: string;
    info: string;
    description: string;
  }[];
};

export const AnatomyTable = component$(
  ({ firstColumnLabel = 'Component', propDescriptors }: AnatomyTableProps) => {
    return (
      <div class="prose prose-sm overflow-auto">
        <table class="mb-6 w-full min-w-[540px] text-left sm:min-w-full">
          <tbody class="divide-y">
            <tr class="text-foreground">
              <td class="w-2/6 whitespace-nowrap p-2 text-base font-semibold sm:pl-0">
                {firstColumnLabel}
              </td>
              <td class="w-4/6 whitespace-nowrap p-2 text-base font-semibold sm:pl-0">
                Description
              </td>
            </tr>
            {propDescriptors?.map((propDescriptor) => {
              return (
                <tr key={propDescriptor.name}>
                  <td class="align-center py-3 pl-2 pr-2 sm:pl-0 md:align-baseline">
                    <code class="border-primary text-accent-foreground mr-6 rounded border border-b-2">
                      {propDescriptor.name}
                    </code>
                  </td>
                  <td class="py-3 align-baseline">
                    <div class="prose-docs-table">
                      <p>{propDescriptor.description}</p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);
