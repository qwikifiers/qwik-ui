import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface TextInputProps extends WithClassesProp {
  placeholder?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const TextInput = component$(
  ({ class: classProp = '', className = '', ...props }: TextInputProps) => {
    const cssClass = cn('input w-full max-w-xs', classProp, className);
    return (
      <input
        type="text"
        placeholder={props.placeholder}
        class={cssClass}
        {...props}
        onChange$={props.onChange$}
      />
    );
  }
);
