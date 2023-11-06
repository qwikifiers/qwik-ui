import { component$ } from '@builder.io/qwik';
import { ComboboxOption, ComboboxListbox, type ResolvedOption } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <ComboboxListbox
      optionRenderer$={(option: ResolvedOption, index: number) => (
        <ComboboxOption key={option.key} index={index} resolved={option}>
          {option.label}
        </ComboboxOption>
      )}
    />
  );
});
