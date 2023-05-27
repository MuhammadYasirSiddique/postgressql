import React from "react";
import Button from "./components/button";
import Todolist from "./components/todolist";
import Link from "next/link";
import AddTodo from "./components/addtodo";
function Home() {
  return (
    <main className="bg-gradient-radial from-slate-500 to-slate-800 h-screen">
      <Link href="./apiinfo">
        <Button name="Api Info" />
      </Link>
      <div className="flex  justify-center items-center ">
        <div
          className="px-3 py-4 rounded-2xl opacity-80 bg-gradient-radial from-indigo-400 to-indigo-600
         shadow-lg w-full max-w-md "
        >
          {/* @ts-ignore */}
          <Todolist />
          <AddTodo />
          <div className=" h-1.5 bg-slate-700 rounded-full w-1/2 mx-auto"></div>
        </div>
      </div>
    </main>
  );
}

export default Home;
