import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLInputElement> {}


function InputField({ ...props }) {
  return <input className="dark:bg-gray-2 dark:placeholder:text-white-10 dark:text-white" {...props} />;
}

export default InputField;
