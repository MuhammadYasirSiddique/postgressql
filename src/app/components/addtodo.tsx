"use client";
import { AiOutlineSend } from "react-icons/Ai";
import LoadingIcons from "react-loading-icons";
import React, { useState, useEffect } from "react";
import { NewTodo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  const handleSubmit = async () => {
    try {
      if (task) {
        setIsLoading(true);
        const res = await fetch(`/api/todo`, {
          method: "POST",
          body: JSON.stringify({
            task: task.task,
          }),
        });
        // console.log(task);
        refresh();
      }
      setTask({ task: "" });
      setIsLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <form className="w-full flex" action="">
        <input
          onChange={(e) => setTask({ task: e.target.value })}
          className="rounded-full w-full px-4 mx-2 my-2 border-2  shadow-lg"
          type="text"
        />
        {isLoading ? (
          <button
            onClick={handleSubmit}
            type="button"
            className="shrink-0 p-2 mx-2 my-2 text-center rounded-full text-white text-xl 
        bg-gradient-radial from-slate-500 to-slate-700 shadow-lg"
          >
            <LoadingIcons.TailSpin />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="shrink-0 p-2 mx-2 my-2 text-center rounded-full text-white text-xl 
          bg-gradient-radial from-slate-500 to-slate-700 shadow-lg"
          >
            <AiOutlineSend size={38} />
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTodo;
