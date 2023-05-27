import React from "react";

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Display({ as = "h1", children, className }: DisplayProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[68px] leading-[92px] font-semibold ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default Display;
