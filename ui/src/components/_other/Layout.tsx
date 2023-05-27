import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { CMDK } from "../navigation/cmdk/CMDK";

export interface LayoutProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Layout({ className, children, ...props }: LayoutProps) {
  return (
    <div
      className={`flex top-0 h-screen min-h-screen w-full flex-col overflow-hidden`}
      {...props}
    >
      <CMDK key="cmdk" />

      <Header />

      <div className="flex h-full w-full">
        {/* <Sidebar /> */}

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.15,
            type: "spring",
            bounce: 0.25,
            stiffness: 60,
          }}
          className={`flex w-full flex-col items-center overflow-y-scroll ${className}`}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;