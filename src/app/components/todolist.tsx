import { Todo } from "@/lib/drizzle";
import Image from "next/image";
import Button from "./button";
import AddTodo from "./addtodo";
// import { useRouter } from "next/navigation";

const GetTodos = async () => {
  // const { refresh } = useRouter();
  try {
    const res = await fetch("http:/127.0.0.1:3000/api/todo", {
      method: "GET",
      cache: "no-store",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Todo List");
    }
    const result = await res.json();
    // refresh();
    // console.log(res.ok);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// const DeleteTodo;

const Todolist = async () => {
  const todos: { data: Todo[] } = await GetTodos();
  // console.log(todos);

  return (
    <div className="max-h-[300px] overflow-auto mb-2">
      {todos.data.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-gray-300 py-1 px-4 flex items-center gap-x-3 rounded-md shadow my-4 mx-2"
          >
            <input type="checkbox" className="shadow-2xl" />
            <div className="h-3 w-3  rounded-full bg-slate-800"> </div>

            <p className="text-lg font-medium">{item.task}</p>
            <div className="ml-auto ">
              <button type="button" className=" shadow-2xl">
                <Image src={"/cane1.png"} alt="" width={30} height={30} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todolist;
