import type { PropFunction } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

export interface PaginationProps {
  class?: string;
  selectedPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;

  // styles
  selectedClass?: string;
  gap: number | string;
}

export const Pagination = component$<PaginationProps>(
  ({ class: _class, selectedPage, totalPages, onPageChange$, gap, selectedClass }) => {
    return (
      <nav role="navigation" aria-label="pagination" data-testid="pagination">
        <button
          type="button"
          aria-label={'prevAriaLabel'}
          disabled={selectedPage <= 1}
          onClick$={() => {
            if (selectedPage !== 1) {
              onPageChange$(selectedPage - 1);
            }
          }}
        >
          <div q:slot="prefix">⬅️</div>
          <span>PREV</span>
        </button>
        <ul style={{ display: 'flex', gap: gap }}>
          {[...new Array(totalPages + 1).keys()].map((page: number) => {
            if (page === 0) return null;
            return (
              <li key={page}>
                <div>
                  <button
                    class={{
                      [selectedClass || '']: selectedPage === page,
                    }}
                    type="button"
                    aria-label={`Page ${page} of ${totalPages}`}
                    aria-current={selectedPage === page}
                    onClick$={() => {
                      onPageChange$(page);
                    }}
                  >
                    {page}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          aria-label={'nextAriaLabel'}
          disabled={selectedPage >= totalPages}
          onClick$={() => {
            if (selectedPage < totalPages) {
              onPageChange$(selectedPage + 1);
            }
          }}
        >
          <span>NEXT</span>
          <div q:slot="suffix">➡️</div>
        </button>
      </nav>
    );
  },
);
