import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';
type APITableProps = {
  propDescriptors: {
    name: string;
    info: string;
    type: string;
    description: string;
  }[];
};

export const APITable = component$(({ propDescriptors }: APITableProps) => {
  return (
    <div class="overflow-auto">
      <table class="w-full min-w-[540px] border-b border-gray-700 text-left sm:min-w-full">
        <tbody class="divide-y divide-gray-700">
          <tr class="w-1/4 dark:text-white ">
            <td class="w-1/6 whitespace-nowrap py-2 pl-4 text-sm font-medium sm:pl-0">
              Prop
            </td>
            <td class="w-1/6 whitespace-nowrap py-2 text-sm font-medium ">Type</td>
            <td class="w-2/3 whitespace-nowrap py-2 text-sm font-medium ">Description</td>
          </tr>
          {propDescriptors?.map((propDescriptor) => {
            return (
              <tr key={propDescriptor.name}>
                <td class="prose prose-sm py-3 pl-4 align-baseline sm:pl-0 ">
                  <code class="bg-indigo-200 dark:bg-indigo-900 rounded-md mr-6">
                    {propDescriptor.name}
                  </code>
                </td>
                <td class="prose prose-sm py-3 align-baseline">
                  <span class="flex items-center">
                    <code class="bg-gray-300 dark:bg-gray-700">
                      {propDescriptor.type}
                    </code>
                    {propDescriptor.info && (
                      <Popover placement="top">
                        <PopoverContent>
                          <div class="bg-[#202425] text-[#7881fa] max-w-xs mb-2 text-md px-4 py-2  rounded-md">
                            {propDescriptor?.info}
                          </div>
                        </PopoverContent>
                        <PopoverTrigger>
                          <div class="hover:bg-slate-500 hover:bg-opacity-50 h-[31px] mt-2 p-2 rounded-md">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path
                                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>{' '}
                        </PopoverTrigger>
                      </Popover>
                    )}
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
    </div>
  );
});
