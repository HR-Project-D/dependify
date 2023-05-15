import React from "react";
import * as Select from "@radix-ui/react-select";
import { IconCheck, IconChevron } from "../shared/Icons";
import { capitalize } from "@/utils/formatting";

type SelectDropdownProps = {
  options: string[];
  onChange: (value: string) => void;
  defaultValue: string;
  icon?: React.ReactNode;
};

function SelectDropdown({
  options,
  defaultValue,
  onChange,
  icon,
}: SelectDropdownProps) {
  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={(value) => onChange(value)}
    >
      <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-black-10 bg-white dark:border-white-10 dark:bg-gray-2 px-4 py-2 font-normal focus:outline-none">
        <div className="flex gap-2.5">
          {icon}
          <Select.Value />
        </div>
        <Select.Icon className="SelectIcon">
          <IconChevron className="w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="mt-2 w-[--radix-select-trigger-width] rounded-xl border border-black-10 bg-white dark:border-gray-5 dark:bg-gray-2 p-1 drop-shadow-lg"
        >
          <Select.Viewport>
            <Select.Group className="flex flex-col gap-1">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {capitalize(option)}
                </SelectItem>
              ))}
            </Select.Group>

          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default SelectDropdown;

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};

function SelectItem({ children, value }: SelectItemProps) {
  return (
    <Select.Item
      value={value}
      className="cursor-pointer dark:data-[state=checked]:text-white dark:text-white-64 dark:hover:text-white flex justify-between items-center data-[state=checked]:bg-black-5 dark:data-[state=checked]:bg-gray-4 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-black-5 dark:hover:bg-gray-4 focus:outline-none"
    >
      <Select.ItemText className="text-red-10 focus:outline-none">
        {children}
      </Select.ItemText>
      <Select.ItemIndicator>
        <IconCheck className="w-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
