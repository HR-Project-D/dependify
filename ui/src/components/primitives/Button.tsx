import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  [
    "transition-all focus:outline-none disabled:cursor-not-allowed flex items-center h-fit active:shadow-inner active:translate-y-0.5 duration-200 border border-b-0",
  ],
  {
    variants: {
      intent: {
        mauve: ["bg-gray-4 hover:bg-gray-5", "text-white", "border-white-10"],
        primary: [
          "bg-primary-8 hover:bg-primary-9",
          "text-white",
          "border-primary-11 hover:border-primary-11",
        ],
        white: [
          "dark:bg-white bg-gray-4 hover:bg-gray-5 dark:hover:bg-white-80",
          "dark:text-gray-DARK text-white",
          "dark:border-white dark:hover:border-white-16 border-gray-4 hover:border-gray-5",
        ],
        lightGray: [
          "bg-black-5 hover:bg-black-8 dark:bg-white-5 dark:hover:bg-white-8",
          "text-gray-DARK dark:text-white",
          "border-black-2 dark:border-white-2",
        ],
        mauveDark: [
          "bg-gray-2 hover:bg-gray-3",
          "text-white",
          "border-white-10",
        ],
        noBG: [
          "dark:text-white-64 dark:hover:bg-white-5 hover:bg-black-5 text-black-64",
          "border-transparent",
        ],
      },
      size: {
        small: ["text-xs font-medium", "px-3 py-1.5", "gap-1.5"],
        medium: ["text-sm font-medium", "px-3 py-1.5", "gap-2"],
        large: ["text-sm font-medium", "px-3.5 py-2", "gap-2"],
      },
      rounded: {
        full: "rounded-full",
        default: "rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  fullWidth,
  rounded,
  ...props
}) => (
  <button
    className={button({ intent, size, rounded, className, fullWidth })}
    {...props}
  >
    {props.children}
  </button>
);
