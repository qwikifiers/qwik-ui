import { component$ } from '@builder.io/qwik';

interface TableProps {
  cols: string[];
  rows: Record<string, string>[];
}

export const Table = component$(({ cols, rows }: TableProps) => {
  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
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
});
