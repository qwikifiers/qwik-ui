import { component$, PropFunction } from '@builder.io/qwik';
import { WithClassesProp } from '../../types';
import cn from 'classnames';

interface InputGroupProps extends WithClassesProp {
  hint: string;
  label: string;
  placeholder?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const InputGroup = component$(
  ({
    hint,
    label,
    placeholder,
    class: classProp = '',
    className = '',
    ...props
  }: InputGroupProps) => {
    const cssClass = cn('form-control', classProp, className);
    return (
      <div class={cssClass} {...props}>
        <label class="label">
          <span class="label-text">{hint}</span>
        </label>
        <label class="input-group">
          <span>{label}</span>
          <input
            type="text"
            placeholder={placeholder}
            class="input input-bordered"
            onChange$={props.onChange$}
          />
        </label>
      </div>
    );
  }
);
