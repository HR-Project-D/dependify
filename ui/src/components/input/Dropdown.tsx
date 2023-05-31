import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Content({ children, offset = 6 }: { children: React.ReactNode, offset?: number }) {
  return (
    <DropdownMenu.Content
      className="bg-gray-0 w-full flex flex-col gap-0.5 rounded-lg p-1.5 border border-white-5 drop-shadow-2xl"
      sideOffset={offset}
      align="end"
      loop
    >
      {children}
    </DropdownMenu.Content>
  );
}

export function Item({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <DropdownMenu.Item
      className="flex w-full justify-between text-sm focus:outline-0 focus:bg-gray-2 active:bg-gray-2 text-white-48 hover:text-white gap-5 rounded-lg cursor-pointer py-1.5 px-3 duration-300 transition-all hover:bg-gray-2"
      disabled={disabled}
      onSelect={onClick}
    >
      {children}
    </DropdownMenu.Item>
  );
}

export function Separator() {
  return <DropdownMenu.Separator className="bg-gray-3 h-px mx-auto my-1 w-full" />;
}