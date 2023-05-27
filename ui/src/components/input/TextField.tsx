import { ErrorMessage, ErrorMessageProps, Field, FieldAttributes } from "formik";
import React from "react";

interface TextFieldProps extends FieldAttributes<any> {
  style: "icon" | "iconless";
  icon?: React.ReactNode;
}

export function TextField({
  icon,
  style,
  error,
  touched,
  ...props
}: TextFieldProps) {
  return (
    <div className="relative flex w-full items-center">
      {style === "icon" && (
        <div className="pointer-events-none absolute flex items-center p-4">
          {icon}
        </div>
      )}
      <Field
        {...props}
        className={`
          ${style === "icon" && "pl-11"}
          w-full border disabled:opacity-60 rounded-lg border-black-10 bg-white px-4 py-2 font-normal placeholder:text-white-48
          focus:outline-none disabled:cursor-not-allowed dark:border-white-8 dark:bg-gray-1 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-white-16 dark:text-white`}
      />
    </div>
  );
}

interface TextFieldErrorProps extends ErrorMessageProps {}

export function TextFieldError({ ...props }: TextFieldErrorProps) {
  return (
    <ErrorMessage
      {...props}
      render={(msg) => <div className="text-sm text-red-11">{msg}</div>}
    />
  );
}
