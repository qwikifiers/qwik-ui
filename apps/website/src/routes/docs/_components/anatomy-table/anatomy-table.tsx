import { component$ } from '@builder.io/qwik';
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
      <table class="w-full max-w-full text-left">
        <tbody class="divide-y divide-slate-300 dark:divide-slate-600">
          <tr class="text-slate-950 dark:text-white">
            <td class="whitespace-nowrap py-2 pl-4 text-sm font-medium sm:pl-0 font-[700]">
              Component
            </td>
            <td class="whitespace-nowrap py-2 text-sm font-[600]">Description</td>
          </tr>
          {propDescriptors?.map((propDescriptor) => {
            return (
              <tr key={propDescriptor.name}>
                <td class="py-3 pl-2 pr-2 align-center sm:pl-0 md:align-baseline">
                  <code class="px-2 py-[2px] rounded-md border-[1px] border-b-[2px] border-qwikui-blue-500 bg-qwikui-blue-50 dark:bg-qwikui-purple-100 dark:border-qwikui-purple-500 text-slate-950 rounded-md mr-6 font-[400]">
                    {propDescriptor.name}
                  </code>
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
