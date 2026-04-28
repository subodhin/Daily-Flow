import React from "react";
import { Task } from "../types";

type Column = {
  key: keyof Task;
  label: string;
  hidden?: boolean;
};

type Props = {
  columns: Column[];
};

const TableHeader = ({ columns }: Props) => {
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <div>
      <div
        className="grid gap-3 font-semibold border-b pb-2 "
        style={{ gridTemplateColumns: `repeat(${visibleColumns.length}, 1fr)` }}
      >
        {visibleColumns.map((column) => (
          <div key={column.key} className="p-2">
            {column.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;