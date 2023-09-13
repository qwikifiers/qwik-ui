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
      <table class="mb-6 w-full min-w-[540px] border-b border-slate-200 text-left dark:border-slate-800 sm:min-w-full">
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr class="w-1/4 dark:text-white ">
            <th class="w-1/6 whitespace-nowrap py-2 pl-4 text-base font-[600] font-medium text-slate-700 dark:text-slate-300 sm:pl-0">
              Prop
            </th>
            <th class="w-1/6 whitespace-nowrap py-2 text-base font-[600] text-slate-700 dark:text-slate-300">
              Type
            </th>
            <th class="w-2/3 whitespace-nowrap p-2 text-base font-[600] text-slate-700 dark:text-slate-300">
              Description
            </th>
          </tr>
          {propDescriptors?.map((propDescriptor) => {
            return (
              <tr key={propDescriptor.name}>
                <td class="prose prose-sm py-3 pl-4 align-baseline sm:pl-0 ">
                  <code class="border-qwikui-blue-500 bg-qwikui-blue-50 dark:bg-qwikui-purple-100 dark:border-qwikui-purple-500 mr-6 rounded-md border-[1px] border-b-[2px] font-[400] text-slate-950">
                    {propDescriptor.name}
                  </code>
                </td>
                <td class="py-3 align-baseline">
                  <span class="flex items-center">
                    <code class="rounded-md border-[1px] border-b-2 border-slate-700 bg-slate-100 px-2 dark:border-slate-400 dark:bg-slate-700">
                      {propDescriptor.type}
                    </code>
                    {propDescriptor.info && (
                      <Popover placement="top">
                        <PopoverContent>
                          <div class="shadow-light-medium bg-qwikui-blue-50 dark:shadow-dark-high text-md  border-qwikui-blue-500 dark:border-qwikui-purple-500 dark:bg-qwikui-purple-100 mb-2 max-w-xs  rounded-lg border-[1px] border-b-2 px-3 py-2 font-[500] text-slate-950 sm:w-max">
                            {propDescriptor?.info}
                          </div>
                        </PopoverContent>
                        <PopoverTrigger>
                          <div class="mx-2 mt-2 rounded-md rounded-xl p-1 hover:bg-slate-500 hover:bg-opacity-50">
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
                  <div class="prose prose-sm prose-docs-table px-2">
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
