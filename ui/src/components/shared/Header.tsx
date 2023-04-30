import React from "react";
import { IconWifi, IconWifiOff } from "./Icons";
import { getFormattedDate } from "@/utils/formatting";

function Header() {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  const [currentDate, setCurrentDate] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setCurrentDate(new Date());

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
    <header className='flex w-full items-center justify-between border-b border-white-10 px-5 py-1.5 text-sm text-white-48'>
      <h1 className=''>Dependify 0.1.0</h1>
      <span className='rounded-md bg-white-8 px-3 py-0.5 text-white-56'>⌘+K</span>

      <div className='flex items-center gap-4'>
        {/* <span className='rounded-md border border-white-8 bg-white-5 px-3.5 py-1.5 text-sm font-medium'>
          <IconDependify className='w-5 fill-primary-11' />
        </span> */}
        {isOnline ? <IconWifi className='w-5 text-white-48' /> : <IconWifiOff className='w-5 text-white-48' />}
        <span>{currentDate ? getFormattedDate(currentDate) : getFormattedDate(new Date())}</span>
      </div>
    </header>
  );
}

export default Header;
