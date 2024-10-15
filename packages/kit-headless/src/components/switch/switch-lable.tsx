
import { component$, PropsOf, Slot, useId } from '@builder.io/qwik';
export const SwitchLable = component$<PropsOf<'lable'>>(() => {
    const id = useId()
    return (
      <label aria-label='switch' for={`switch-${id}`}  >
        <Slot></Slot>
      </label>
    );
  },
);
