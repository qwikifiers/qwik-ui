import { component$, PropFunction } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface PaginationProps extends WithClassesProp {
  activeOption: number;
  options: string[];
  onClick: PropFunction<(index: number) => void>;
}

export const Pagination = component$(
  ({
    activeOption,
    options,
    onClick,
    class: classProp = '',
    className = '',
    ...props
  }: PaginationProps) => {
    const cssClass = cn('btn-group', classProp, className);
    return (
      <div class={cssClass} {...props}>
        {options.map((option, i) => (
          <button
            class={`btn ${activeOption === i ? 'btn-active' : ''}`}
            onClick$={() => onClick(i)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
);
