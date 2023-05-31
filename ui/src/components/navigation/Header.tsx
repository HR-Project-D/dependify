import { getOperatingSystem } from "@/utils/platform";
import { IconLogout, IconSearch, IconUser } from "../_other/Icons";
import Keybind from "../_other/Keybind";
import { useUIContext } from "@/state/UI";
import { useUserContext } from "@/state/User";
import { AuthService } from "@/services/AuthService";
import { removeCookie } from "@/utils/cookies";

function Header() {
  const { dispatch: UIDispatch } = useUIContext();
  const { dispatch: UserDispatch } = useUserContext();

  async function handleLogout() {
    await AuthService.logout();

    UserDispatch({ type: "LOGOUT" });
  }

  return (
    <header className="pointer-events-none absolute left-0 z-20 flex w-full items-center justify-between px-5 py-2 text-sm text-white-48">
      <h1 className="invisible 2xl:visible">Dependify</h1>

      <div className="flex items-center gap-3">
        {/* <button
          onClick={() => UIDispatch({ type: "TOGGLE_COMMAND_MENU" })}
          className="pointer-events-auto flex w-[356px] items-center justify-between rounded-lg border border-white-8 bg-gray-1 px-4 py-1.5"
        >
          <span className="flex gap-3 text-white-48">
            <IconSearch className="w-4" />
            Search
          </span>
          <span className="flex items-center gap-1.5">
            <Keybind>{userOs === "Mac" ? "⌘" : "CMD"}</Keybind>
            <Keybind>{userOs === "Mac" ? "K" : "K"}</Keybind>
          </span>
        </button> */}
        <button
          onClick={() => UIDispatch({ type: "TOGGLE_COMMAND_MENU" })}
          className="pointer-events-auto rounded-full border border-white-8 bg-gray-1 p-2"
        >
          <IconSearch className="w-4 text-white-48" />
        </button>
        <button className="pointer-events-auto rounded-full border border-white-8 bg-gray-1 p-2">
          <IconUser className="w-4 text-white-48" />
        </button>
        <button
          onClick={() => handleLogout()}
          className="pointer-events-auto rounded-full border border-white-8 bg-gray-1 p-2"
        >
          <IconLogout className="w-4 text-white-48" />
        </button>
      </div>
    </header>
  );
}

export default Header;
