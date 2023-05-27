import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Keybind({ className, children, ...props }: Props) {
  return (
    <kbd
      className={`flex h-5 min-w-[20px] items-center justify-center rounded bg-black-5 p-1 text-xs font-semibold uppercase text-black-64 dark:bg-white-8 dark:font-normal dark:text-white-56 ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}

export default Keybind;
