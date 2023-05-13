import { Field } from "formik";
import React, { useState } from "react";

type InputFieldProps = {
  style: "icon" | "iconless";
  type: "date" | "email" | "password" | "file" | "tel" | "text";
  placeholder?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  
  /** Formik Props */
  id: string;
  name: string;
  validate?: (value: string) => any;
  error?: string | undefined;
  touched?: boolean | undefined;
};

export function InputField({ style, type, placeholder, icon, disabled, id, name, validate, error, touched }: InputFieldProps) {
  let inputFieldIconStyle = "";
  let inputFieldStyle = "";
  let inputFieldBorderStyle = "";

  if(error && touched) {
    inputFieldBorderStyle = "border-error-500 focus:outline outline-2 outline-error-600"
  } else {
    inputFieldBorderStyle = "focus:outline outline-primary-10";
  }
  
  if(style === "icon") {
    inputFieldIconStyle = "p-3 absolute pointer-events-none flex items-center";
      inputFieldStyle = "pl-11";
  }

  return (
    <>
      {disabled ? (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={inputFieldIconStyle}>{icon}</div>
          <Field
            validate={validate}
            disabled
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} cursor-not- w-full bg-gray-2 border border-white-10 rounded-xl placeholder:text-gray-10 px-4 py-2 font-normal text-white`}
          ></Field>
        </div>
      ) : (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={inputFieldIconStyle}>{icon}</div>
          <Field
            validate={validate}
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} w-full bg-gray-2 border border-white-10 rounded-xl placeholder:text-gray-10 px-4 py-2 font-normal text-white`}
          ></Field>
        </div>
      )}
    </>
  );
}
