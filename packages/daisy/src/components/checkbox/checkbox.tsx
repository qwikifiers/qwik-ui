import { component$, HTMLAttributes } from '@builder.io/qwik';
import { clsq } from '@qwik-ui/shared';
import {
  Checkbox as HeadlessCheckbox,
} from '@qwik-ui/headless';
export type CheckboxProps = HTMLAttributes<HTMLElement>;

export const Checkbox = component$(
  (props: CheckboxProps) => {
    const { class: classNames, ...rest } = props;
    return (
        <HeadlessCheckbox class={clsq('Checkbox bg-base-100 ', classNames)} {...rest} />
    );
  }
);
