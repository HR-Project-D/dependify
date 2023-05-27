import React from "react";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Title({ as = "h1", children, className }: TitleProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent
      className={`text-[28px] leading-[36px] font-semibold ${className}`}
    >
      {children}
    </HeadingComponent>
  );
}

export default Title;
