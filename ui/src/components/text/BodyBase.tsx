import React from "react";
import { BodyProps } from "./BodyLarge";

function BodyBase({ as = "p", children, className }: BodyProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-base ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default BodyBase;
