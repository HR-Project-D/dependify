import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Body from "../text/Body";

const button = cva(
  [
    "transition-all border-t disabled:cursor-not-allowed justify-center flex items-center active:shadow-inner active:translate-y-0.5 duration-200",
  ],
  {
    variants: {
      intent: {
        mauve: ["bg-gray-4 hover:bg-gray-5", "text-white", "border-white-10"],
        primary: [
          "bg-accent-8 hover:bg-accent-9",
          "text-white",
          "border-accent-11 hover:border-accent-11",
        ],
        white: [
          "bg-white hover:bg-white-80",
          "text-gray-DARK font-medium",
          "border-whitehover:border-white-16",
        ],
        lightGray: [
          "bg-white-5 hover:bg-white-8",
          "text-white",
          "border-white-2",
        ],
        mauveDark: [
          "bg-gray-2 hover:bg-gray-3",
          "text-white",
          "border-white-10",
        ],
        noBG: [
          "text-white-64 hover:bg-white-5",
          "border-transparent",
        ],
      },
      size: {
        standard: "px-4 py-1.5 min-w-[120px]",
        compact: "px-2.5 py-1",
        icon: "p-1.5",
      },
      rounded: {
        full: "rounded-full",
        default: "rounded-lg",
      },
      fullWidth: {
        true: "w-full py-2",
        false: "w-fit",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "standard",
      fullWidth: false,
      rounded: "default",
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
    <Body className="flex gap-2">{props.children}</Body>
  </button>
);
