import React from "react";
import { CMDK } from "./cmdk/CMDK";
import Header from "./Header";
import Sidebar from "./Sidebar";

export interface LayoutProps extends React.ButtonHTMLAttributes<HTMLDivElement> {}

function Layout({ className, children, ...props }: LayoutProps) {
  return (
    <div className={`flex h-screen min-h-screen w-full flex-col overflow-hidden ${className}`} {...props}>
      <CMDK key='cmdk' />

      <Header />

      <div className='flex h-full w-full'>
        <Sidebar />

        <main className='w-full min-w-full p-8'>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
