import { component$ } from '@builder.io/qwik';

type APITableProps = {
  propDescriptors: {
    name: string;
    type: string;
    description: string;
  }[];
};

export const APITable = component$(({ propDescriptors }: APITableProps) => {
  return (
    <table class="w-full min-w-[540px] border-b border-gray-700 text-left sm:min-w-full">
      <tbody class="divide-y divide-gray-700">
        <tr class="w-1/4 text-white">
          <td class="w-1/6 whitespace-nowrap py-2 pl-4 text-sm font-medium sm:pl-0">
            Prop
          </td>
          <td class="w-1/6 whitespace-nowrap py-2 text-sm font-medium">Type</td>
          <td class="w-2/3 whitespace-nowrap py-2 text-sm font-medium">
            Description
          </td>
        </tr>
        {propDescriptors?.map((propDescriptor) => {
          return (
            <tr key={propDescriptor.name}>
              <td class="prose prose-sm py-3 pl-4 align-baseline sm:pl-0 ">
                <code>{propDescriptor.name}</code>
              </td>
              <td class="prose prose-sm py-3 align-baseline">
                <span class="">
                  <code>{propDescriptor.type}</code>
                </span>
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
  );
});
