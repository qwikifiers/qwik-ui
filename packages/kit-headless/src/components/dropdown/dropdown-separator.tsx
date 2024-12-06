import { PropsOf, component$ } from '@builder.io/qwik';

export const HDropdownSeparator = component$((props: PropsOf<'hr'>) => {
  return <hr {...props} />;
});
