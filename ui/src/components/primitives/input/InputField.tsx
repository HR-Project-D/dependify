import { Field, FieldAttributes } from "formik";
import React from "react";

interface InputFieldProps extends FieldAttributes<any> {
  style: "icon" | "iconless";
  icon?: React.ReactNode;
}

export function InputField({
  icon,
  style,
  error,
  touched,
  ...props
}: InputFieldProps) {
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
          w-full rounded-xl border border-black-10 bg-white px-4 py-2 font-normal placeholder:text-gray-10
          focus:outline-none disabled:cursor-not-allowed dark:border-white-10 dark:bg-gray-2 dark:text-white`}
      />
    </div>
  );
}
