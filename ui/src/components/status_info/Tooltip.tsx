import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

function Tooltip({
  children,
  text,
  className,
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
}) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root
        delayDuration={200}
      >
        <RadixTooltip.Trigger asChild type="button" className={` ${className}`}>
          <span>
          {children}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={6}
            className="z-[70] max-w-2xl rounded-lg border border-white-8 bg-gray-2 px-2 py-1 text-xs text-white-48 drop-shadow-xl"
          >
            <span>{text}</span>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export default Tooltip;
