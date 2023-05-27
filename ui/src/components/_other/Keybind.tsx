import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Keybind({ className, children, ...props }: Props) {
  return (
    <kbd
      className={`flex h-5 min-w-[20px] items-center justify-center rounded p-1 text-xs uppercase bg-white-8 text-white-56 ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}

export default Keybind;
