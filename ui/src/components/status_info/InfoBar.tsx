import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import Body from "../text/Body";
import { Button } from "../input/Button";
import { IconNotification, IconX } from "../_other/Icons";
import { HTMLMotionProps, motion } from "framer-motion";

export const infoBar = cva(
  ["rounded-lg flex justify-between px-6 py-4 items-center"],
  {
    variants: {
      intent: {
        informational: "bg-gray-1",
        success: "bg-green-1",
        critical: "bg-red-1",
      },
    },
    defaultVariants: {
      intent: "informational",
    },
  }
);

interface Props
  extends HTMLMotionProps<"article">,
    VariantProps<typeof infoBar> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  mutliLine?: boolean;
  button?: React.ReactNode;
}

export function InfoBar({
  children,
  open,
  onClose,
  title,
  className,
  intent = "informational",
  mutliLine,
  button,
  ...props
}: Props) {
  let badgeStyle = {
    informational: "w-5 text-accent-10",
    success: "w-5 text-green-10",
    critical: "w-5 text-red-10",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "tween" }}
      className={infoBar({ intent, className })}
      {...props}
    >
      <div className="flex items-center gap-4 text-white-80">
        <IconNotification className={badgeStyle[intent || "informational"]} />
        <Body className="font-medium">{title}</Body>
        <Body>{children}</Body>
      </div>
      <div className="flex items-center gap-4">
        {button}
        <Button onClick={onClose} size="icon" intent="noBG">
          <IconX className="w-5 text-white" />
        </Button>
      </div>
    </motion.article>
  );
}
