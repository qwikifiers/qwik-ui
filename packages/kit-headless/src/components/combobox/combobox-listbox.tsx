import { component$, PropsOf, Slot } from '@builder.io/qwik';

type ComboboxListboxProps = PropsOf<'ul'>;

/**
 * @deprecated This component is deprecated. It will be removed in a future release.
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
