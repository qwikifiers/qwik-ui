import { component$, PropsOf, Slot } from '@builder.io/qwik';

type ComboboxListboxProps = PropsOf<'ul'>;

/**
 * @deprecated This component is deprecated. Please remove it from your code.
 */
export const HComboboxListbox = component$<ComboboxListboxProps>(
  (props: PropsOf<'ul'>) => {
    // props to prevent type errors in consumer apps
    props;

    return (
      <>
        <Slot />
      </>
    );
  },
);
