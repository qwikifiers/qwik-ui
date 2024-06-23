import { component$ } from '@builder.io/qwik';
import { Combobox } from '~/components/ui';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const fruits = [
    'Apple',
    'Apricot',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Currant',
    'Cherry',
    'Coconut',
  ];

  return (
    <>
      <Combobox.Root>
        <Combobox.Label>Personal Trainers</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger>
            <LuChevronDown />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover gutter={8}>
          {fruits.map((fruit) => (
            <Combobox.Item key={fruit}>
              <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
              <Combobox.ItemIndicator>
                <LuCheck />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
    </>
  );
});
