"use client";
import React, { useEffect, useReducer } from "react";
import TableRow from "./components/TableRow";
import { Task } from "./types";
import Button from "../components/Button";
import TableHeader from "./components/TableHeader";
import { Column } from "./types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

/* -------------------- REDUCER -------------------- */

type State = {
  list: Task[];
  newTask: Task;
  editingId: number | null;
  lastAction?: string;
};

type Action =
  | { type: "ADD_TASK" }
  | { type: "DELETE_TASK"; id: number }
  | { type: "UPDATE_TASK"; id: number; field: keyof Task; value: unknown }
  | { type: "UPDATE_NEW_TASK"; field: keyof Task; value: unknown }
  | { type: "START_EDIT"; id: number }
  | { type: "STOP_EDIT" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        list: [...state.list, state.newTask],
        newTask: {
          id: state.list.length + 1,
          date: "",
          hours: 0,
          status: "Not Started",
        },
      };

    case "DELETE_TASK":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
        lastAction: "DELETE",

      };
      

    case "UPDATE_TASK":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.id
            ? { ...item, [action.field]: action.value }
            : item
        ),
        lastAction: "UPDATE",
      };

    case "UPDATE_NEW_TASK":
      return {
        ...state,
        newTask: {
          ...state.newTask,
          [action.field]: action.value,
        },
      };

    case "START_EDIT":
      return { ...state, editingId: action.id };

    case "STOP_EDIT":
      return { ...state, editingId: null };

    default:
      return state;
  }
};

/* -------------------- COMPONENT -------------------- */

const TableArea = () => {
  const columns: Column[] = [
    { key: "date", label: "Date" },
    { key: "hours", label: "Hours" },
    { key: "status", label: "Status" },
  ];

  // const [state, dispatch] = useReducer(reducer, {
  //   list: [
  //     { id: 1, date: "2026-04-01", hours: 2, status: "Done" },
  //     { id: 2, date: "2026-04-02", hours: 3, status: "In Progress" },
  //     { id: 3, date: "2026-04-04", hours: 1, status: "Not Started" },
  //   ],
  //   newTask: {
  //     id: 5,
  //     date: "",
  //     hours: 0,
  //     status: "Not Started",
  //   },
  //   editingId: null,
  // });

  const initialState = (): State => {
  try {
    const saved = localStorage.getItem("myState");
    const parsed = saved ? JSON.parse(saved) : [];

    return {
      list: Array.isArray(parsed) ? parsed : [],
      newTask: {
        id: 0,
        date: "",
        hours: 0,
        status: "Not Started",
      },
      editingId: null,
    };
  } catch {
    return {
      list: [],
      newTask: {
        id: 0,
        date: "",
        hours: 0,
        status: "Not Started",
      },
      editingId: null,
    };
  }
};


 const [state, dispatch] = useReducer(reducer, undefined, initialState);

  //useEffect
  useEffect(() => {
    console.log("State changed::::::", state);
  }, [state]);

useEffect(() => {
  console.log("Saving to localStorage", state);
  
  if (["ADD", "UPDATE", "DELETE"].includes(state.lastAction || "")) {
    localStorage.setItem("myState", JSON.stringify(state.list));
  }
}, [state.list, state.lastAction]);


  return (
    <div className="w-1/2 p-6">
      <div className="bg-white shadow-lg rounded-xl p-5 space-y-4">

        {/* Header */}
        <div
          className="grid border-b pb-2"
          style={{ gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)` }}
        >
          <TableHeader columns={columns} />
          <div />
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {state.list.map((item) => (
            <div
              key={item.id}
              className="grid items-center p-2 rounded hover:bg-gray-50 border"
              style={{
                gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
              }}
            >
              <TableRow
                item={item}
                mode={state.editingId === item.id ? "edit" : "view"}
                columns={columns}
                onChange={(field, value) =>
                  dispatch({
                    type: "UPDATE_TASK",
                    id: item.id,
                    field,
                    value,
                  })
                }
              />

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 pr-2">
                {state.editingId === item.id ? (
                  <button
                    className="text-green-600 text-sm"
                    onClick={() => dispatch({ type: "STOP_EDIT" })}
                  >
                    Save
                  </button>
                ) : (
                  <span
                    className="cursor-pointer text-blue-500 hover:scale-110"
                    onClick={() =>
                      dispatch({ type: "START_EDIT", id: item.id })
                    }
                  >
                    <EditOutlined />
                  </span>
                )}

                <span
                  className="cursor-pointer text-red-500 hover:scale-110"
                  onClick={() =>
                    dispatch({ type: "DELETE_TASK", id: item.id })
                  }
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
            item={state.newTask}
            columns={columns}
            onChange={(field, value) =>
              dispatch({
                type: "UPDATE_NEW_TASK",
                field,
                value,
              })
            }
          />
        </div>

        {/* Add Button */}
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch({ type: "ADD_TASK" })}
          >
            Add Task
          </Button>
        </div>

      </div>
    </div>
  );
};

export default TableArea;