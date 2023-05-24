import React, { ReactNode } from "react";
interface ButtonProp {
  name: string;
}
const Button = ({ name }: ButtonProp) => {
  return (
    <div className="">
      <button
        type={"button"}
        className="bg-gradient-radial from-indigo-500 to-indigo-800
         text-slate-200 m-2 py-1 px-5 text-lg rounded-md hover:from-indigo-400 hover:to-indigo-600   "
      >
        {" "}
        {name}
      </button>
    </div>
  );
};

export default Button;
