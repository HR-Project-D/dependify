import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

function Dropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          Open
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-gray-2 shadow p-4 rounded-lg border border-gray-5">
          <DropdownMenu.Label>Test</DropdownMenu.Label>
          <DropdownMenu.Item>
            New Window <div className="RightSlot">⌘+N</div>
          </DropdownMenu.Item>

          <DropdownMenu.Group>
            <DropdownMenu.Item />
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Dropdown;
