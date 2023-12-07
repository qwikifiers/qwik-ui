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
            <th class="font-400 text-left">Key</th>
            <th class="text-left">
              <p class="font-400 ml-6">Description</p>
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
      <tr class="border-b">
        <td class="py-4">
          <kbd class="border-primary inline-block w-max rounded-md border border-b-[2px] px-2 capitalize">
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
