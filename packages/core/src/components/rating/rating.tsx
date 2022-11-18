import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface RatingProps extends WithClassesProp {
  value: number;
  max: number;
}

export const Rating = component$(
  ({
    value,
    max,
    class: classProp = '',
    className = '',
    ...props
  }: RatingProps) => {
    const cssClass = cn('rating', classProp, className);
    return (
      <div class={cssClass} {...props}>
        {Array(max)
          .fill('')
          .map((_, i) => (
            <input
              type="radio"
              name="rating-1"
              class="mask mask-star"
              checked={value === i + 1}
            />
          ))}
      </div>
    );
  }
);
