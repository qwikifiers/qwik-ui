import { component$ } from '@builder.io/qwik';
import cn from 'classnames';
import { WithClassesProp } from '../../types';

interface TableProps extends WithClassesProp {
  cols: string[];
  rows: Record<string, string>[];
}

export const Table = component$(
  ({
    cols,
    rows,
    class: classProp = '',
    className = '',
    ...props
  }: TableProps) => {
    const cssClass = cn('table w-full', classProp, className);
    return (
      <div class="overflow-x-auto">
        <table class={cssClass} {...props}>
          <thead>
            <tr>
              {cols.map((col) => (
                <th>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr>
                {Object.values(row).map((value) => (
                  <th>{value}</th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
