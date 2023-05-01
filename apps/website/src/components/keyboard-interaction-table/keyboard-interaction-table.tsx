import { component$, $, QRL } from '@builder.io/qwik';

type KBInteractionTableRowProps = {
  keyboard?: string;
  deck?: QRL;
};

const SAMPLE_DATA = {
  title: { key: 'Key', deck: 'Description' },
  keys: [
    {
      id: crypto.randomUUID(),
      title: 'Space',
      description: $(() => <>Close a dialog or cancel an action.</>),
    },
    {
      id: crypto.randomUUID(),
      title: 'Enter',
      description: $(() => (
        <>
          Moves focus to the next{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b> when
          orientation is vertical.
        </>
      )),
    },
    {
      id: crypto.randomUUID(),
      title: 'Tab',
      description: $(() => <>Moves focus to the next focusable element.</>),
    },
    {
      id: crypto.randomUUID(),
      title: 'Shift + Tab',
      description: $(() => (
        <>
          Moves focus to the next{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b> when
          orientation is vertical.
        </>
      )),
    },
    {
      id: crypto.randomUUID(),
      title: 'Home',
      description: $(() => (
        <>
          When focus is on an{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b>, moves
          focus to the first{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b>.
        </>
      )),
    },
    {
      id: crypto.randomUUID(),
      title: 'End',
      description: $(() => (
        <>
          When focus is on an{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b>, moves
          focus to the last{' '}
          <b class="text-[var(--qwik-light-purple)]">AccordionItem</b>.
        </>
      )),
    },
  ],
};
export const KeyboardInteractionTable = component$(
  (props: KBInteractionTableRowProps) => {
    return (
      <table class="mb-6">
        <thead>
          <tr class="border-b-2">
            <th class="text-left font-thin text-md text-slate-400">Key</th>
            <th class="text-left">
              <p class="ml-6 font-thin text-md text-slate-400">Description</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_DATA.keys.map((key) => (
            <KBInteractionTableRow
              key={key.id}
              keyboard={key.title}
              deck={key.description}
            />
          ))}
        </tbody>
      </table>
    );
  }
);

export const KBInteractionTableRow = component$(
  ({ keyboard, deck }: KBInteractionTableRowProps) => {
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
  }
);
