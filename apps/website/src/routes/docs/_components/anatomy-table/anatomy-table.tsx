import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';
import {} from '@qwik-ui/headless';

type AnatomyTableProps = {
  propDescriptors: {
    name: string;
    info: string;
    description: string;
  }[];
};

export const AnatomyTable = component$(({ propDescriptors }: AnatomyTableProps) => {
  return (
    <div class="overflow-auto">
      <table class="w-full max-w-full border-b border-gray-700 text-left">
        <tbody class="divide-y divide-gray-700">
          <tr class="text-white">
            <td class="whitespace-nowrap py-2 pl-4 text-sm font-medium sm:pl-0">
              Component
            </td>
            <td class="whitespace-nowrap py-2 text-sm font-medium">Description</td>
          </tr>
          {propDescriptors?.map((propDescriptor) => {
            return (
              <tr key={propDescriptor.name}>
                <td class="prose prose-sm py-3 pl-4 align-baseline sm:pl-0 ">
                  <code>{propDescriptor.name}</code>
                </td>
                <td class="py-3 align-baseline">
                  <div class="prose prose-sm prose-docs-table">
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
});
