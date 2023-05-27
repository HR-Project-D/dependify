import { useRouter } from "next/router";
import React from "react";
import { IconDatabase, IconGrid, IconNotification, IconSearch } from "./Icons";
import Link from "next/link";
import { motion } from "framer-motion";

function Sidebar() {
  const path = useRouter().pathname;

  return (
    <aside className="flex h-full flex-col justify-between border-r border-black-10 dark:border-white-8 dark:bg-gray-1">
      <ul className="flex flex-col gap-1.5 p-3">
        <SidebarMenuItem href="/">
          <IconGrid
            className={`${
              path === "/"
                ? "text-black dark:text-white"
                : "text-black-64 dark:text-gray-10"
            } w-4`}
          />
          Dashboard
        </SidebarMenuItem>
        <SidebarMenuItem href="/scan">
          <IconSearch
            className={`${
              path === "/scan"
                ? "text-black dark:text-white"
                : "text-black-64 dark:text-gray-10"
            } w-4`}
          />
          Scan
        </SidebarMenuItem>
        <SidebarMenuItem href="/data-sources">
          <IconDatabase
            className={`${
              path === "/data-sources"
                ? "text-black dark:text-white"
                : "text-black-64 dark:text-gray-10"
            } w-4`}
          />
          Data Sources
        </SidebarMenuItem>
        <SidebarMenuItem href="/alerts">
          <IconNotification
            className={`${
              path === "/alerts"
                ? "text-black dark:text-white"
                : "text-black-64 dark:text-gray-10"
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
              ? "text-black dark:text-white"
              : "text-black-64 dark:text-white-48"
          } z-10 flex items-center gap-3 transition-all duration-300`}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-item"
            className="absolute left-0 top-0 h-full w-full rounded-lg bg-black-5 dark:bg-white-8"
          ></motion.div>
        )}
      </li>
    </Link>
  );
}

// import { useRouter } from "next/router";
// import React from "react";
// import Link from "next/link";
// import { AnimatePresence, motion } from "framer-motion";
// import { IconDependify, IconSearch, IconDatabase } from "../shared/Icons";

// function Sidebar() {
//   const path = useRouter().pathname;

//   return (
//     <aside className="flex h-full flex-col justify-between">
//       <ul className="flex flex-col gap-1.5 px-1.5 pb-3">
//         <SidebarMenuItem href="/">
//           <IconDependify
//             className={`${
//               path === "/"
//                 ? "text-black dark:text-white"
//                 : "text-black-64 dark:text-gray-10"
//             } w-5`}
//           />
//         </SidebarMenuItem>
//         <SidebarMenuItem href="/scan2">
//           <IconSearch
//             className={`${
//               path === "/scan2"
//                 ? "text-black dark:text-white"
//                 : "text-black-64 dark:text-gray-10"
//             } w-5`}
//           />
//         </SidebarMenuItem>
//         <SidebarMenuItem href="/data-sources">
//           <IconDatabase
//             className={`${
//               path === "/data-sources"
//                 ? "text-black dark:text-white"
//                 : "text-black-64 dark:text-gray-10"
//             } w-5`}
//           />
//         </SidebarMenuItem>
//         {/* <SidebarMenuItem href="/alerts">
//           <IconNotification
//             className={`${
//               path === "/alerts"
//                 ? "text-black dark:text-white"
//                 : "text-black-64 dark:text-gray-10"
//             } w-6`}
//           />
//           Alerts
//         </SidebarMenuItem> */}
//       </ul>

//       <span></span>
//     </aside>
//   );
// }

// export default Sidebar;

// function SidebarMenuItem({
//   children,
//   href,
// }: {
//   children: React.ReactNode;
//   href: string;
// }) {
//   const isActive = useRouter().pathname === href;

//   let text =
//     href === "/" ? "Dashboard" : href.replace("/", "").replace("-", " ");
//   text = text.replace(/\b\w/g, (l) => l.toUpperCase());

//   return (
//     <Link href={href}>
//       <li
//         className={`relative flex h-[62px] w-[76px] items-center justify-center text-2xs font-medium`}
//       >
//         <motion.span
//           className={`${
//             isActive
//               ? "text-black dark:text-white"
//               : "text-black-64 dark:text-white-48"
//           } z-10 flex flex-col items-center gap-1.5 transition-all duration-300`}
//         >
//           {children}
//           {text}
//         </motion.span>
//         {isActive && (
//           <motion.div
//             layoutId="sidebar-active-item"
//             className="absolute left-0 top-0 flex h-full w-full rounded-md bg-gray-5"
//           >
//           </motion.div>
//         )}
//       </li>
//     </Link>
//   );
// }
