import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  const rootRef = useSignal<HTMLDivElement>();
  const triggerRef = useSignal<HTMLButtonElement>();
  const inputRef = useSignal<HTMLInputElement>();
  const labelRef = useSignal<HTMLDivElement>();
  const controlRef = useSignal<HTMLDivElement>();
  const popoverRef = useSignal<HTMLDivElement>();

  useVisibleTask$(() => {
    console.log('rootRef', rootRef.value);
    console.log('triggerRef', triggerRef.value);
    console.log('inputRef', inputRef.value);
    console.log('labelRef', labelRef.value);
    console.log('controlRef', controlRef.value);
    console.log('popoverRef', popoverRef.value);
  });

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
    <Combobox.Root class="combobox-root" ref={rootRef}>
      <Combobox.Label class="combobox-label" ref={labelRef}>
        Personal Trainers
      </Combobox.Label>
      <Combobox.Control class="combobox-control" ref={controlRef}>
        <Combobox.Input class="combobox-input" ref={inputRef} />
        <Combobox.Trigger class="combobox-trigger" ref={triggerRef}>
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8} ref={popoverRef}>
        {fruits.map((fruit) => (
          <Combobox.Item key={fruit} class="combobox-item">
            <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
            <Combobox.ItemIndicator>
              <LuCheck />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        ))}
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
