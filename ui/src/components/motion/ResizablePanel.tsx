import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {}

function ResizablePanel({ ...props }: Props) {
  return (
    <motion.div
      className="w-full overflow-hidden border-t border-gray-5 first:border-t-0"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      {...props}
    />
  );
}

export default ResizablePanel;
