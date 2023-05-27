import React from "react";
import * as Select from "@radix-ui/react-select";
import { IconCheck, IconChevron } from "../_other/Icons";
import { capitalize } from "@/utils/formatting";

type SelectDropdownProps = {
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  defaultValue: string;
  icon?: React.ReactNode;
};

function SelectDropdown({
  options,
  defaultValue,
  disabled,
  onChange,
  icon,
}: SelectDropdownProps) {
  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={(value) => onChange(value)}
    >
      <Select.Trigger
        disabled={disabled}
        className="flex disabled:cursor-not-allowed disabled:opacity-60 w-full items-center justify-between rounded-lg border border-black-10 bg-white px-4 py-2 font-normal focus:outline-none dark:border-white-8 dark:bg-gray-1"
      >
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
          className="mt-2 w-[--radix-select-trigger-width] rounded-lg border border-black-10 bg-white p-1 drop-shadow-lg dark:border-white-8 dark:bg-gray-1"
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
      className="data-[state=checked]:bg-black-3 hover:bg-black-3 flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-4 py-2 transition-colors duration-300 focus:outline-none dark:text-white-64 dark:hover:border-white-8 dark:hover:bg-gray-3 dark:hover:text-white dark:focus:bg-gray-3 dark:active:border-white-8 dark:active:bg-gray-3 dark:data-[state=checked]:border-white-8 dark:data-[state=checked]:bg-gray-3 dark:data-[state=checked]:text-white"
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
