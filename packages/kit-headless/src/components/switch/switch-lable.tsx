
import { component$, PropsOf, Slot } from '@builder.io/qwik';
export const SwitchLable = component$<PropsOf<'lable'>>(() => {
    return (
      <label>
        <Slot></Slot>
      </label>
    );
  },
);
