import { useRouter } from "next/router";
import React from "react";
import { IconDatabase, IconGrid, IconNotification, IconSearch } from "../_other/Icons";
import Link from "next/link";
import { motion } from "framer-motion";

function Sidebar() {
  const path = useRouter().pathname;

  return (
    <aside className="flex h-full min-h-screen flex-col justify-between border-r border-white-8 bg-gray-1">
      <ul className="flex flex-col gap-1.5 p-3">
        <SidebarMenuItem href="/">
          <IconGrid
            className={`${
              path === "/"
                ? "text-white"
                : "text-gray-10"
            } w-4`}
          />
          Dashboard
        </SidebarMenuItem>
        <SidebarMenuItem href="/scan">
          <IconSearch
            className={`${
              path === "/scan"
                ? "text-white"
                : "text-gray-10"
            } w-4`}
          />
          Scan
        </SidebarMenuItem>
        <SidebarMenuItem href="/data-sources">
          <IconDatabase
            className={`${
              path === "/data-sources"
                ? "text-white"
                : "text-gray-10"
            } w-4`}
          />
          Data Sources
        </SidebarMenuItem>
        <SidebarMenuItem href="/alerts">
          <IconNotification
            className={`${
              path === "/alerts"
                ? "text-white"
                : "text-gray-10"
            } w-4`}
          />
          Alerts
        </SidebarMenuItem>
      </ul>

      <span></span>
    </aside>
  );
}

export default Sidebar;

function SidebarMenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const isActive = useRouter().pathname === href;

  return (
    <Link href={href}>
      <li className={`relative flex w-52 px-4 py-2.5 text-sm font-medium`}>
        <span
          className={`${
            isActive
              ? "text-white"
              : "text-white-48"
          } z-10 flex items-center gap-3 transition-all duration-300`}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-item"
            className="absolute left-0 top-0 h-full w-full rounded-lg bg-white-8"
          ></motion.div>
        )}
      </li>
    </Link>
  );
}