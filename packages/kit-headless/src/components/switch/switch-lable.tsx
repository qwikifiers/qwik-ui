
import { component$, PropsOf, Slot, useId } from '@builder.io/qwik';
export const SwitchLable = component$<PropsOf<'lable'>>((rest) => {
    const id = useId()
    return (
      <label aria-label='switch' for={`switch-${id}`} data-switch-lable {...rest}>
        <Slot></Slot>
      </label>
    );
  },
);
