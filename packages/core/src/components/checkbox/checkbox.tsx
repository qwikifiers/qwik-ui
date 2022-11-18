import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface CheckboxProps extends WithClassesProp {
  checked: boolean;
  label?: string;
  onChange$?: PropFunction<(event: any) => void>;
}

export const Checkbox = component$(
  ({
    checked,
    label,
    class: classProp = '',
    className = '',
    ...props
  }: CheckboxProps) => {
    const cssClass = cn('form-control', classProp, className);
    return (
      <div className={cssClass} {...props}>
        <label className="label cursor-pointer">
          {label && <span className="label-text">{label}</span>}
          <input
            type="checkbox"
            checked={checked}
            className="checkbox"
            onChange$={props.onChange$}
          />
        </label>
      </div>
    );
  }
);
