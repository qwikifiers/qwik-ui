import { component$ } from '@builder.io/qwik';
export type APITableProps = {
  propDescriptors: {
    name: string;
    info?: string;
    type: string;
    description: string;
  }[];
};

export const APITable = component$(({ propDescriptors }: APITableProps) => {
  return (
    <div class="overflow-auto">
      <table class="mb-6 w-full min-w-[540px] border-b text-left sm:min-w-full">
        <tbody class="divide-y">
          <tr class="w-1/4">
            <th class="w-1/6 whitespace-nowrap py-2 pl-4 font-semibold sm:pl-0">Prop</th>
            <th class="w-1/6 whitespace-nowrap py-2 font-semibold">Type</th>
            <th class="w-2/3 whitespace-nowrap p-2 font-semibold">Description</th>
          </tr>
          {propDescriptors?.map((propDescriptor) => {
            return (
              <tr key={propDescriptor.name}>
                <td class="py-3 pl-4 sm:pl-0">
                  <div class="flex items-center gap-2">
                    <code class="mr-6 rounded-base border border-b-2 border-primary px-2">
                      {propDescriptor.name}
                    </code>
                  </div>
                </td>
                <td class="py-3">
                  <div class="flex items-center gap-2">
                    <code class="rounded-base border border-b-2 px-2">
                      {propDescriptor.type}
                    </code>
                    {/* {propDescriptor.info && <InfoPopup info={propDescriptor.info} />} */}
                  </div>
                </td>
                <td class="py-3 align-baseline">
                  <div class="px-2">
                    <p class="text-base">{propDescriptor.description}</p>
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
