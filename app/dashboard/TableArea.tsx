"use client";
import React, { useState } from "react";
import TableRow from "./components/TableRow";
import { Task } from "./types";
import Button from "../components/Button";
import TableHeader from "./components/TableHeader";
import { Column } from "./types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
   // alert("Edit functionality not implemented");
  };
  return (
    <div className="w-1/2 p-6">
      <div className="bg-white shadow-lg rounded-xl p-5 space-y-4">
        {/* Header */}
        <TableHeader columns={columns} />
        <div />
        <div />

        {/* Rows */}
        <div className="space-y-2">
          {list.map((item) => (
            <div
              key={item.id}
              className="grid items-center p-2 rounded hover:bg-gray-50 border"
              style={{
                gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
              }}
            >
              <TableRow
                item={item}
                mode={editingId === item.id ? "edit" : "view"}
                columns={columns}
                // icon={
                //   <span className="mr-2 cursor-pointer text-red-500">
                //     <span className="" onClick={() => handleDelete(item.id)}>
                //       <DeleteOutlined />
                //     </span>
                //     <span className="ml-2 cursor-pointer text-blue-500">
                //       <span className="" onClick={() => handleEdit(item.id)}>
                //         <EditOutlined />
                //       </span>
                //     </span>
                //   </span>
                // }
                onChange={(field, value) => {
                  if (editingId === item.id) {
                    setList((prev) =>
                      prev.map((i) =>
                        i.id === item.id ? { ...i, [field]: value } : i,
                      ),
                    );
                  }
                }}
              />

                <div className="flex justify-end items-center gap-3 pr-2">
    {/* Edit / Save */}
    {editingId === item.id ? (
      <button
        className="text-green-600 text-sm"
        onClick={() => setEditingId(null)}
      >
        Save
      </button>
    ) : (
      <span
        className="cursor-pointer text-blue-500 hover:scale-110 transition"
        onClick={() => setEditingId(item.id)}
      >
        <EditOutlined />
      </span>
    )}

    {/* Delete */}
    <span
      className="cursor-pointer text-red-500 hover:scale-110 transition"
      onClick={() => handleDelete(item.id)}
    >
      <DeleteOutlined />
    </span>
  </div>
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
