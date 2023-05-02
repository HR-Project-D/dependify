import { useRouter } from "next/router";
import React from "react";
import { IconDatabase, IconGrid, IconNotification, IconSearch } from "./Icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { Button } from "../primitives/Button";

function Sidebar() {
  const path = useRouter().pathname;

  return (
    <aside className='flex h-full flex-col justify-between border-r border-black-10 dark:border-white-8 dark:bg-gray-1'>
      <ul className='flex flex-col gap-1.5 p-3'>
        <SidebarMenuItem href='/'>
          <IconGrid className={`${path === "/" ? "text-black dark:text-white" : "text-black-64 dark:text-gray-10"} w-4`} />
          Dashboard
        </SidebarMenuItem>
        <SidebarMenuItem href='/search'>
          <IconSearch className={`${path === "/search" ? "text-black dark:text-white" : "text-black-64 dark:text-gray-10"} w-4`} />
          Search
        </SidebarMenuItem>
        <SidebarMenuItem href='/data-sources'>
          <IconDatabase className={`${path === "/data-sources" ? "text-black dark:text-white" : "text-black-64 dark:text-gray-10"} w-4`} />
          Data Sources
        </SidebarMenuItem>
        <SidebarMenuItem href='/alerts'>
          <IconNotification className={`${path === "/alerts" ? "text-black dark:text-white" : "text-black-64 dark:text-gray-10"} w-4`} />
          Alerts
        </SidebarMenuItem>
      </ul>

      <span></span>
    </aside>
  );
}

export default Sidebar;

function SidebarMenuItem({ children, href }: { children: React.ReactNode; href: string }) {
  const isActive = useRouter().pathname === href;

  return (
    <Link href={href}>
      <li className={`relative flex w-52 px-4 py-2.5 text-sm font-medium`}>
        <span className={`${isActive ? "dark:text-white text-black" : "dark:text-white-48 text-black-64"} z-10 flex items-center gap-3 transition-all duration-300`}>
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId='sidebar-active-item'
            className='absolute left-0 top-0 h-full w-full rounded-lg bg-black-5 dark:bg-white-8'
          ></motion.div>
        )}
      </li>
    </Link>
  );
}
