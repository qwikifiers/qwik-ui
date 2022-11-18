import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface RadioProps extends WithClassesProp {
  checked: boolean;
  label?: string;
  name?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Radio = component$(
  ({
    label,
    name = 'radio-1',
    class: classProp = '',
    className = '',
    ...props
  }: RadioProps) => {
    const cssClass = cn('form-control', classProp, className);
    return (
      <div className={cssClass}>
        <label className="label cursor-pointer">
          {label && <span className="label-text">{label}</span>}
          <input
            type="radio"
            name={name}
            className="radio"
            onChange$={props.onChange$}
            {...props}
          />
        </label>
      </div>
    );
  }
);
