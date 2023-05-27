import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface Props extends HTMLMotionProps<"div"> {
  transitionDuration?: number;
}

function ResizablePanel({ transitionDuration, ...props }: Props) {
  return (
    <motion.div
      className="w-full overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: transitionDuration || 0.25, type: "tween" }}
      exit={{ height: 0, opacity: 0 }}
      {...props}
    />
  );
}

export default ResizablePanel;
