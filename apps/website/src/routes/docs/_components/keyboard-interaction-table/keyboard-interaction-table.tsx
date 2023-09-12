import { component$ } from '@builder.io/qwik';

type KBInteractionTableRowProps = {
  keyTitle: string;
  description: string;
};

export interface KeyboardInteractionTableProps {
  keyDescriptors: KBInteractionTableRowProps[];
}

export const KeyboardInteractionTable = component$(
  (props: KeyboardInteractionTableProps) => {
    return (
      <table class="mb-6">
        <thead>
          <tr>
            <th class="font-400 text-left text-base text-slate-700 dark:text-slate-300">
              Key
            </th>
            <th class="text-left">
              <p class="font-400 ml-6 text-base text-slate-700 dark:text-slate-300">
                Description
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.keyDescriptors.map((descriptor) => {
            return (
              <KBInteractionTableRow
                key={descriptor.keyTitle}
                keyTitle={descriptor.keyTitle}
                description={descriptor.description}
              />
            );
          })}
        </tbody>
      </table>
    );
  },
);

export const KBInteractionTableRow = component$(
  ({ keyTitle, description }: KBInteractionTableRowProps) => {
    return (
      <tr class="border-b-[1px] border-slate-300 dark:border-slate-600">
        <td class="py-4">
          <kbd class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-500 bg-qwikui-blue-50 dark:bg-qwikui-purple-100 dark:border-qwikui-purple-400 inline-block w-max rounded-md border border-b-[2px] px-2 text-base capitalize text-slate-700 dark:text-slate-950">
            {keyTitle}
          </kbd>
        </td>
        <td>
          <article class="ml-6 text-base">{description}</article>
        </td>
      </tr>
    );
  },
);
