import React from "react";
import { Task } from "../types";

type Column = {
  key: keyof Task;
  label: string;
  hidden?: boolean;
};
type Props = {
  item: Task;
  mode?: "view" | "edit";
   columns: Column[]; 
  onChange?: (field: keyof Task, value: string | number) => void;
};

const TableRow = ({ item, mode = "view", onChange, columns }: Props) => {
  return (
    <div className="contents">
      {/* Hours */}
      {mode === "edit" ? (
        <input
          type="date"
          value={item.date}
          onChange={(e) => onChange?.("date", e.target.value)}
        />
      ) : (
        <span>{item.date}</span>
      )}

      {/* Name */}
      {mode === "edit" ? (
        <input
          type="text"
          value={item.hours}
          className="border p-1 rounded"
          onChange={(e) => onChange?.("hours", e.target.value)}
        />
      ) : (
        <span>{item.hours}</span>
      )}

      {/* Status */}
      {mode === "edit" ? (
        <select
          value={item.status}
          className="border p-1 rounded"
          onChange={(e) => onChange?.("status", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Nothing">Nothing</option>
          <option value="Some Quality">Some Quality</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </select>
      ) : (
        <span>{item.status}</span>
      )}
    </div>
  );
};

export default TableRow;
