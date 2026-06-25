import { useState } from 'react';
import { Pagination } from '@any-design/anyui-react';
import type { PaginationMeta } from '@any-design/anyui-react';

export default function PaginationDemo() {
  const [pagination, setPagination] = useState<PaginationMeta>({ current: 1, pageSize: 10, total: 100 });
  const [largePagination, setLargePagination] = useState<PaginationMeta>({ current: 1, pageSize: 10, total: 60 });
  const [shapesPagination, setShapesPagination] = useState<PaginationMeta>({ current: 3, pageSize: 10, total: 200 });
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic</div>
        <div className="demo-col">
          <Pagination pagination={pagination} onUpdatePagination={setPagination} />
          <span>Current page: {pagination.current}</span>
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Fewer Pages</div>
        <div className="demo-col">
          <Pagination pagination={largePagination} onUpdatePagination={setLargePagination} />
        </div>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Shapes</div>
        <div className="demo-col">
          <Pagination pagination={shapesPagination} shape="rounded" onUpdatePagination={setShapesPagination} />
          <Pagination pagination={shapesPagination} shape="squircle" onUpdatePagination={setShapesPagination} />
          <Pagination pagination={shapesPagination} shape="circle" onUpdatePagination={setShapesPagination} />
        </div>
      </div>
    </div>
  );
}
