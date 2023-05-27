import React from "react";
import { TitleProps } from "./Title";

function TitleLarge({ as = "h1", children, className }: TitleProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[40px] leading-[52px] font-semibold ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default TitleLarge;
