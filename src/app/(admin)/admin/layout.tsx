import React from "react";
import Sidebar from "~/components/admin/common/sidebar";
import Header from "~/components/admin/common/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header/>
        <main className="flex-1 p-8">{children}</main>
        <footer className="p-4 bg-white text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Puzzler Admin. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
