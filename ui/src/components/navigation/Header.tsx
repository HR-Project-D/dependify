import {
  IconFile,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
  IconWarning,
} from "../_other/Icons";
import { useUIContext } from "@/state/UI";
import { useUserContext } from "@/state/User";
import { AuthService } from "@/services/AuthService";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dropdown from "@/components/input/Dropdown";
import { FeedbackIcon } from "./cmdk/Icons";
import { capitalize, getInitials } from "@/utils/formatting";
import { useRouter } from "next/router";

function Header() {
  const { dispatch: UIDispatch } = useUIContext();
  const { dispatch: UserDispatch } = useUserContext();

  return (
    <header className="pointer-events-none absolute left-0 z-20 flex w-full items-center justify-between px-5 py-2 text-sm text-white-48">
      <h1 className="invisible 2xl:visible">Dependify</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={() => UIDispatch({ type: "TOGGLE_COMMAND_MENU" })}
          className="pointer-events-auto rounded-full border border-white-8 bg-gray-1 p-2 hover:bg-gray-2"
        >
          <IconSearch className="w-4 text-white-48" />
        </button>
        <NavDropdown />
      </div>
    </header>
  );
}

function NavDropdown() {
  const router = useRouter();
  const { state: UserState, dispatch: UserDispatch } = useUserContext();

  async function handleLogout() {
    await AuthService.logout();

    UserDispatch({ type: "LOGOUT" });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="pointer-events-auto rounded-full border border-white-8 bg-gray-1 p-2 hover:bg-gray-2">
          <IconUser className="w-4 text-white-48" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <Dropdown.Content offset={24}>
          <div className="flex gap-4 px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-2">
              {getInitials(UserState.user?.name || "")}
            </div>
            <div className="flex flex-col">
              <span>{capitalize(UserState.user?.name || "")}</span>
              <span className="text-sm text-white-48">
                {UserState.user?.email}
              </span>
            </div>
          </div>

          <Dropdown.Separator />

          <Dropdown.Item>
            <span className="flex items-center gap-3">
              <IconFile className="w-4 text-white-48" />
              View documentation
            </span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span className="flex items-center gap-3">
              <IconWarning className="w-4 text-white-48" />
              Report an Issue
            </span>
          </Dropdown.Item>

          <Dropdown.Separator />

          <Dropdown.Item onClick={() => router.push("/settings")}>
            <span className="flex items-center gap-3">
              <IconSettings className="w-4 text-white-48" />
              Settings
            </span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <span className="flex items-center gap-3">
              <IconLogout className="w-4 text-white-48" />
              Sign out
            </span>
          </Dropdown.Item>
        </Dropdown.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Header;
