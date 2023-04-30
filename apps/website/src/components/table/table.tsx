import { component$ } from '@builder.io/qwik';

type TableRowProps = {
  keyboard?: string;
  deck?: string;
};

const SAMPLE_DATA = {
  title: { key: 'Key', deck: 'Description' },
  keys: [
    {
      id: crypto.randomUUID(),
      title: 'Space',
      description: 'Close a dialog or cancel an action.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Enter',
      description:
        'When focus is on an Accordion Item of a collapsed section, expands the section.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Tab',
      description: 'Moves focus to the next focusable element.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Shift + Tab',
      description:
        'Moves focus to the next Accordion Item when orientation is vertical.',
    },
    {
      id: crypto.randomUUID(),
      title: 'ArrowDown',
      description:
        'Moves focus to the next Accordion Item when orientation is vertical.',
    },
    {
      id: crypto.randomUUID(),
      title: 'ArrowUp',
      description:
        'Moves focus to the previous Accordion Item when orientation is vertical.',
    },
    {
      id: crypto.randomUUID(),
      title: 'ArrowRight',
      description:
        'Moves focus to the next Accordion Item when orientation is horizontal.',
    },
    {
      id: crypto.randomUUID(),
      title: 'ArrowLeft',
      description:
        'Moves focus to the previous Accordion Item when orientation is horizontal.',
    },
    {
      id: crypto.randomUUID(),
      title: 'Home',
      description:
        'When focus is on an Accordion Item, moves focus to the first Accordion Item.',
    },
    {
      id: crypto.randomUUID(),
      title: 'End',
      description:
        'When focus is on an Accordion Item, moves focus to the last Accordion Item.',
    },
  ],
};
export const Table = component$(() => {
  return (
    <table class="mt-6">
      <thead>
        <tr class="border-b-2">
          <th class="text-left font-thin text-md text-slate-400">
            {SAMPLE_DATA.title.key}
          </th>
          <th class="text-left">
            <p class="ml-6 font-thin text-md text-slate-400">
              {SAMPLE_DATA.title.deck}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {SAMPLE_DATA.keys.map((key) => (
          <TableRow key={key.id} keyboard={key.title} deck={key.description} />
        ))}
      </tbody>
    </table>
  );
});

export const TableRow = component$(({ keyboard, deck }: TableRowProps) => {
  return (
    <tr class="border-b-2 border-gray-700">
      <td class="py-4">
        <kbd class="border w-max shadow-lg rounded-md px-2 capitalize text-sm inline-block">
          {keyboard}
        </kbd>
      </td>
      <td>
        <p class="ml-6">{deck}</p>
      </td>
    </tr>
  );
});
