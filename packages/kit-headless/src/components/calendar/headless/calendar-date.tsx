import { component$, PropsOf, Slot } from '@builder.io/qwik';
import { Button } from './calendar-button';

export const Date = component$<PropsOf<typeof Button>>((props) => {
  return (
    <Button
      role="button"
      type="button"
      aria-selected={props['aria-selected']}
      aria-disabled={props['aria-disabled']}
      {...props}
    >
      <Slot />
    </Button>
  );
});
