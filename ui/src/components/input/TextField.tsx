import { ErrorMessage, ErrorMessageProps, Field, FieldAttributes } from "formik";
import React from "react";

interface TextFieldProps extends FieldAttributes<any> {
  style: "icon" | "iconless";
  icon?: React.ReactNode;
  color?: "default" | "transparent"
}

export function TextField({
  icon,
  style,
  error,
  color = "default",
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
          ${color === "default" ? "border-white-8 bg-gray-1 " : " border-white-5 bg-white-5"}
          w-full border disabled:opacity-60 rounded-lg px-4 py-2 placeholder:text-white-48
          focus:outline-none disabled:cursor-not-allowed focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-white-16 text-white`}
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
