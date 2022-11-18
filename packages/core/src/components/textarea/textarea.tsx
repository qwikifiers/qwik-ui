import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface TextareaProps extends WithClassesProp {
  placeholder?: string;
  onChange$?: PropFunction<(evt: any) => void>;
}

export const Textarea = component$(
  ({ class: classProp = '', className = '', ...props }: TextareaProps) => {
    const cssClass = cn('textarea', classProp, className);
    return (
      <textarea
        class={cssClass}
        placeholder={props.placeholder}
        {...props}
        onChange$={props.onChange$}
      />
    );
  }
);
