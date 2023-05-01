import { component$, $, QRL } from '@builder.io/qwik';

type APITableProps = {
  propDescriptors: {
    name: string;
    type: string;
    description: string;
  }[];
};

export const APITable = component$(({ propDescriptors }: APITableProps) => {
  return (
    <table class="border-b border-gray-700 text-left ">
      <tbody class="divide-y divide-gray-700">
        <tr class="text-black dark:text-white">
          <td class="whitespace-nowrap py-2 text-sm font-medium">Prop</td>
          <td class="whitespace-nowrap py-2 text-sm font-medium">Type</td>
          <td class="whitespace-nowrap py-2 text-sm font-medium">
            Description
          </td>
        </tr>
        {propDescriptors?.map((propDescriptor) => {
          return (
            <tr key={propDescriptor.name}>
              <td class="py-3 px-2 align-baseline">
                <code>{propDescriptor.name}</code>
              </td>
              <td class="py-3 px-2 align-baseline">
                <span class="">
                  <code>{propDescriptor.type}</code>
                </span>
              </td>
              <td class="py-3 px-2 align-baseline">
                <p>{propDescriptor.description}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export const TableRow = component$(({ keyboard, deck }: TableRowProps) => {
  const Description: any = deck;

  return (
    <tr class="border-b-2 border-gray-700">
      <td class="py-4">
        <kbd class="border w-max shadow-lg rounded-md px-2 capitalize text-sm inline-block">
          {keyboard}
        </kbd>
      </td>
      <td>
        <article class="ml-6">
          <Description />
        </article>
      </td>
    </tr>
  );
});
