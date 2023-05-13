import { ErrorMessage, ErrorMessageProps } from "formik";
import React from "react";

interface InputErrorProps extends ErrorMessageProps {}

function InputError({ ...props }: InputErrorProps) {
  return (
    <ErrorMessage
      {...props}
      render={(msg) => <div className="text-sm text-red-11">{msg}</div>}
    />
  );
}

export default InputError;
