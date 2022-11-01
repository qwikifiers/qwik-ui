import { component$, PropFunction } from '@builder.io/qwik';

interface PaginationProps {
  activeOption: number;
  options: string[];
  onClick: PropFunction<(index: number) => void>;
}

export const Pagination = component$(
  ({ activeOption, options, onClick }: PaginationProps) => {
    return (
      <div class="btn-group">
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
