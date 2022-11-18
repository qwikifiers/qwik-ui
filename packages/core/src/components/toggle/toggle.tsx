import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface ToggleProps extends WithClassesProp {
  checked: boolean;
  label?: string;
}

export const Toggle = component$(
  ({
    checked,
    label,
    class: classProp = '',
    className = '',
    ...props
  }: ToggleProps) => {
    const cssClass = cn('toggle', classProp, className);
    return (
      <div class="form-control">
        <label class="label cursor-pointer">
          {label && <span class="label-text">{label}</span>}
          <input
            type="checkbox"
            class={cssClass}
            checked={checked}
            {...props}
          />
        </label>
      </div>
    );
  }
);
