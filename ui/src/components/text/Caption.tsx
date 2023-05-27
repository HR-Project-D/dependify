import React from "react";

interface CaptionProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "span" | "p";
}

function Caption({ as = "p", children, className }: CaptionProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[12px] leading-[16px] ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default Caption;
