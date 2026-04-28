"use client";
import React, { useState } from "react";
import TableRow from "./components/TableRow";
import { Task } from "./types";
import Button from "../components/Button";
import TableHeader from "./components/TableHeader";
import { Column } from "./types";

const TableArea = () => {
const columns: Column[] = [
  { key: "date", label: "Date" },
  { key: "hours", label: "Hours" },
  { key: "status", label: "Status" },
];

  const [list, setList] = useState<Task[]>([
    { id: 1, date: "2026-04-01", hours: 2, status: "Done" },
    { id: 2, date: "2026-04-02", hours: 3, status: "In Progress" },
    { id: 3, date: "2026-04-04", hours: 1, status: "Not Started" },
  ]);

  const [newTask, setNewTask] = useState<Task>({
    id: 5,
    date: "",
    hours: 0,
    status: "Not Started",
  });

  return (
    <div className="w-1/2 p-6">
      <div className="bg-white shadow-lg rounded-xl p-5 space-y-4">

        {/* Header */}
        <TableHeader columns={columns} />

        {/* Rows */}
        <div className="space-y-2">
          {list.map((item) => (
            <div
              key={item.id}
              className="grid items-center p-2 rounded hover:bg-gray-50 border"
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
            >
              <TableRow item={item} mode="view" columns={columns} />
            </div>
          ))}
        </div>

        {/* Add Row */}
        <div
          className="grid items-center p-2 border rounded bg-gray-50"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          <TableRow
            mode="edit"
            item={newTask}
            columns={columns}
            onChange={(field, value) => {
              setNewTask({ ...newTask, [field]: value });
            }}
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
            onClick={() => {
              setList([...list, newTask]);
              setNewTask({
                id: list.length + 1,
                date: "",
                hours: 0,
                status: "Not Started",
              });
            }}
          >
            Add Task
          </Button>
        </div>

      </div>
    </div>
  );
};

export default TableArea;