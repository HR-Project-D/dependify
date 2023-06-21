import React from "react";
import Header from "../navigation/Header";
import { motion } from "framer-motion";
import { CMDK } from "../navigation/cmdk/CMDK";
import MainNav from "../navigation/MainNav";

export interface LayoutProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Layout({ className, children, ...props }: LayoutProps) {
  return (
    <div className={`flex  min-h-screen w-full flex-col`} {...props}>
      
      <div className="w-full bg-gray-DARK z-50 sticky top-0">
        <Header />
        <MainNav />
      </div>

      <CMDK key="cmdk" />

      <div className="flex h-full w-full">
        <motion.main
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className={`flex invert w-full py-16 px-12 flex-col items-center ${className}`}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;
