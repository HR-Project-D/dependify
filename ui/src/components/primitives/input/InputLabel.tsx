import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function InputLabel({ ...props }: LabelProps) {
  return <label className="text-xs font-medium text-white-64" {...props} />;
}

export default InputLabel;
