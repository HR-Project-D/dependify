import React from "react";

export interface BodyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "span" | "p";
}

function BodyLarge({ as = "p", children, className }: BodyProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[18px] leading-[24px] ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default BodyLarge;
