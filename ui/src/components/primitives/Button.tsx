import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["transition-all duration-300"], {
  variants: {
    intent: {
      dark: [
        "bg-primary-black",
        "text-white",
      ],
      sand: [
        "bg-sand-2",
        "text-primary-black",
      ],
      turquoise: [
        "bg-primary-turquoise",
        "text-primary-black",
      ],
      white: [
        "bg-white",
        "text-primary-black",
      ],
      transparent: [
        "bg-transparent",
        "text-current",
      ],
    },
    size: {
      large: ["text-2xl", "py-5", "px-6"],
      medium: ["text-xl", "py-4", "px-5"],
      small: ["text-lg", "py-2.5", "px-4"],
      extraSmall: ["text-base", "py-1.5", "px-3"],
    },
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    }
  },
  defaultVariants: {
    intent: "dark",
    size: "medium",
    fullWidth: false,
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  fullWidth,
  ...props
}) => <button className={button({ intent, size, className, fullWidth })} {...props} />;
