import { useState } from 'react';
import { Table } from '@any-design/anyui-react';
import type { TableColumn, TableRow } from '@any-design/anyui-react';

const columns: TableColumn[] = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status', align: 'center', width: 120 },
  { key: 'score', title: 'Score', align: 'right', width: 90 },
];

const rows: TableRow[] = [
  { name: 'Mochi', role: 'Designer', status: 'active', score: 98 },
  { name: 'Taro', role: 'Engineer', status: 'active', score: 91 },
  { name: 'Yuki', role: 'PM', status: 'away', score: 84 },
  { name: 'Hana', role: 'Engineer', status: 'active', score: 95 },
  { name: 'Kuma', role: 'QA', status: 'away', score: 88 },
];

export default function TableDemo() {
  const [clickedRow, setClickedRow] = useState('');
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-row">
          <Table
            columns={columns}
            data={rows}
            onRowClick={(row: TableRow) => setClickedRow(String(row.name))}
            renderCell={(column: TableColumn, _row: TableRow, value: unknown) =>
              column.key === 'status' ? (
                <span
                  style={{
                    color: String(value) === 'active' ? 'var(--success)' : 'var(--warn)',
                    fontWeight: 600,
                  }}
                >
                  {String(value)}
                </span>
              ) : undefined
            }
          />
        </div>
        <div className="demo-row">
          <span>Clicked row: {clickedRow || 'none'}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Striped</div>
        <div className="demo-row">
          <Table columns={columns} data={rows} striped hoverable={false} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Empty</div>
        <div className="demo-row">
          <Table columns={columns} data={[]} emptyText="Nothing here yet" />
        </div>
      </div>
    </div>
  );
}
