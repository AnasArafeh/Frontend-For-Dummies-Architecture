// Theme component — reusable table.
// Accepts a rowActions delegate via props that gets called with row data in each row.
// This is the FFD delegate pattern: component passed as prop, rendered by the host.

import './base-table.scss';
import type { ReactNode, ComponentType } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';

interface BaseTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface BaseTableProps<T> {
  columns: BaseTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowActions?: ComponentType<{ row: T }>;
}

export function BaseTable<T>({ columns, rows, rowKey, rowActions: RowActions }: BaseTableProps<T>) {
  if (rows.length === 0) return <BaseBox className="base-table-empty">No data.</BaseBox>;

  return (
    <table className="base-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.header}</th>
          ))}
          {RowActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={rowKey(row)}>
            {columns.map(col => (
              <td key={col.key}>{col.render(row)}</td>
            ))}
            {RowActions && (
              <td>
                <RowActions row={row} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
