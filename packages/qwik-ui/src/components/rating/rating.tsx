import { component$ } from '@builder.io/qwik';

interface RatingProps {
  value: number;
  max: number;
}

export const Rating = component$(({ value, max }: RatingProps) => {
  return (
    <div class="rating">
      {Array(max)
        .fill('')
        .map((_, i) => (
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
            checked={value === i + 1 ? true : false}
          />
        ))}
    </div>
  );
});
