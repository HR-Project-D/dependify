import React from "react";
import Header from "../navigation/Header";
import { motion } from "framer-motion";
import { CMDK } from "../navigation/cmdk/CMDK";
import MainNav from "../navigation/MainNav";

export interface LayoutProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Layout({ className, children, ...props }: LayoutProps) {
  return (
    <div className={`flex min-h-screen w-full flex-col`} {...props}>
      <Header />
      <div className="w-full bg-gray-DARK z-50 sticky top-0">
        <MainNav />
      </div>

      <CMDK key="cmdk" />

      <div className="flex h-full w-full">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            type: "spring",
            bounce: 0.25,
            stiffness: 60,
          }}
          className={`flex w-full py-16 px-12 flex-col items-center ${className}`}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;
