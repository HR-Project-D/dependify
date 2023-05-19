import React from "react";
import { IconUser, IconWifi, IconWifiOff } from "./Icons";

function Header() {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="flex w-full items-center justify-between border-b border-black-10 px-5 py-1.5 text-sm font-medium text-black-64 dark:border-white-10 dark:font-normal dark:text-white-48">
      <h1 className="">Dependify 0.1.0</h1>

      <div className="flex items-center gap-4">
        <span className="rounded-md bg-black-5 px-3 py-0.5 text-black-72 dark:bg-white-8 dark:text-white-56">
          ⌘+K
        </span>
        {isOnline ? (
          <IconWifi className="w-5 text-black-64 dark:text-white-48" />
        ) : (
          <IconWifiOff className="w-5 text-black-64 dark:text-white-48" />
        )}
        <IconUser className="w-5 text-black-64 dark:text-white-48" />
      </div>
    </header>
  );
}

export default Header;
