import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface SelectProps extends WithClassesProp {
  placeholder: string;
  options: string[];
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Select = component$(
  ({ class: classProp = '', className = '', ...props }: SelectProps) => {
    const cssClass = cn('select w-full max-w-xs', classProp, className);
    return (
      <select class={cssClass} onChange$={props.onChange$} {...props}>
        <option disabled selected>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
    );
  }
);
