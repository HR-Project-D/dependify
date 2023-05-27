import React from "react";
import { BodyProps } from "./BodyLarge";

function Body({ as = "p", children, className }: BodyProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[14px] leading-[20px] ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default Body;
