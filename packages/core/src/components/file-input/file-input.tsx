import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface FileInputProps extends WithClassesProp {
  onChange$?: PropFunction<(evt: any) => void>;
}

export const FileInput = component$(
  ({ class: classProp = '', className = '', ...props }: FileInputProps) => {
    const cssClass = cn('file-input w-full max-w-xs', classProp, className);
    return (
      <input
        type="file"
        class={cssClass}
        {...props}
        onChange$={props.onChange$}
      />
    );
  }
);
