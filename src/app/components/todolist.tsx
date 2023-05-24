import { Todo } from "@/lib/drizzle";
import { error } from "console";
import React from "react";

const getTodos = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/todo", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Todo List");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const Todolist = async () => {
  const todos: { data: Todo[] } = await getTodos();
  //   console.log(todos);

  return (
    <>
      {todos.data.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-gray-300 py-2 px-4 flex items-center gap-x-3 rounded-md shadow my-4"
          >
            <div className="h-3 w-3  rounded-full bg-slate-800"> </div>
            <p className="text-lg font-medium">{item.task}</p>
          </div>
        );
      })}
    </>
  );
};

export default Todolist;
