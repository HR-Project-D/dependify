import React from "react";

interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function InputLabel({ ...props }: InputLabelProps) {
  return <label className="text-xs font-medium text-black-64 dark:text-white-64" {...props} />;
}

export default InputLabel;
