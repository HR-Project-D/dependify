import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

function Tooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger className="h-full">{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={6}
            className="z-[70] rounded-lg border border-white-8 bg-gray-2 px-2 py-1 text-xs text-white-48 drop-shadow-xl"
          >
            <span>{text}</span>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export default Tooltip;
