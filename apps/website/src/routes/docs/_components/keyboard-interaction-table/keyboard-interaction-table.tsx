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
          <tr class="border-b-2">
            <th class="text-left font-400 text-md text-slate-800 dark:text-slate-400">
              Key
            </th>
            <th class="text-left">
              <p class="ml-6 font-400 text-md text-slate-800 dark:text-slate-400">
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
      <tr class="border-b-2 border-gray-700">
        <td class="py-4">
          <kbd class="border w-max shadow-lg rounded-md px-2 capitalize text-sm inline-block">
            {keyTitle}
          </kbd>
        </td>
        <td>
          <article class="ml-6">{description}</article>
        </td>
      </tr>
    );
  },
);
