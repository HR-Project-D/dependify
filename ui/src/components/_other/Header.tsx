import { getOperatingSystem } from "@/utils/platform";
import { IconSearch, IconUser } from "./Icons";
import Keybind from "./Keybind";
import { useUIContext } from "@/state/UI";

function Header() {
  let userOs = undefined;

  if (typeof window !== "undefined") {
    userOs = getOperatingSystem();
  }

  const { dispatch: UIDispatch } = useUIContext();

  return (
    <header className="relative flex w-full items-center justify-between border-b border-black-10 px-5 py-2 text-sm font-medium text-black-64 dark:border-white-10 dark:font-normal dark:text-white-48">
      <h1 className="">Dependify</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => UIDispatch({ type: "TOGGLE_COMMAND_MENU" })}
          className="pointer-events-auto flex w-[356px] items-center justify-between rounded-lg border-white-8 bg-gray-3 px-4 py-1.5 dark:bg-gray-3"
        >
          <span className="flex gap-3 text-black-48 dark:text-white-48">
            <IconSearch className="w-4" />
            Search
          </span>
          <span className="flex items-center gap-1.5">
            <Keybind>{userOs === "Mac" ? "⌘" : "CMD"}</Keybind>
            <Keybind>{userOs === "Mac" ? "K" : "K"}</Keybind>
          </span>
        </button>
        <button className="p-2 bg-gray-3 rounded-full border-white-8">
          <IconUser className="w-4 text-black-64 dark:text-white-48" />
        </button>
      </div>
    </header>
  );
}

export default Header;

// import { getOperatingSystem } from "@/utils/platform";
// import { IconSearch, IconUser } from "./Icons";

// function Header() {
//   let userOs = undefined;

//   if (typeof window !== "undefined") {
//     userOs = getOperatingSystem();
//   }

//   return (
//     <header className="relative flex w-full items-center justify-between px-5 py-4 text-sm text-black-64 dark:border-white-10 dark:font-normal dark:text-white-48">
//       <div className="pointer-events-none absolute flex h-full w-full items-center justify-center">
//         <button className="w-full gap-4 px-4 py-2 text-white text-sm items-center bg-gray-3 border-t border-white-10 rounded-lg flex max-w-lg">
//           <IconSearch className="w-4 text-white" />
//           Search
//         </button>
//       </div>

//       <h1 className="font-medium">Dependify</h1>

//       <div className="flex items-center gap-4">
//         {/* <kbd className="rounded-md bg-black-5 px-3 py-0.5 text-black-72 dark:bg-white-8 dark:text-white-56">
//           {userOs === "Mac" ? "⌘+K" : "CMD K"}
//         </kbd> */}
//         <IconUser className="w-5 text-black-64 dark:text-white-48" />
//       </div>
//     </header>
//   );
// }

// export default Header;
