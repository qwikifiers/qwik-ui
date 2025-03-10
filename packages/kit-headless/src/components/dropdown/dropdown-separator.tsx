import { PropsOf, component$ } from '@qwik.dev/core';

export const HDropdownSeparator = component$((props: PropsOf<'hr'>) => {
  return <hr {...props} />;
});
