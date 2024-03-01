import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './select.css?inline';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const usersSig = useSignal<string[]>([
    'Tim',
    'Ryan',
    'Jim',
    'Bobbie',
    'Joan',
    'Jessie',
    'Abby',
  ]);

  return (
    <Select class="select">
      <p>This one is the disabled</p>
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectListbox class="select-listbox">
        {usersSig.value.map((user, index) => (
          <SelectOption
            class="select-option"
            key={user}
            disabled={
              index === 0 || index === 2 || index === usersSig.value.length - 1
                ? true
                : false
            }
          >
            {user}
          </SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
});
