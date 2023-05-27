import React from "react";

interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

function Subtitle({ as = "h1", children, className }: SubtitleProps) {
  const HeadingComponent = as;

  return (
    <HeadingComponent className={`text-[20px] leading-[28px] font-medium ${className}`}>
      {children}
    </HeadingComponent>
  );
}

export default Subtitle;
