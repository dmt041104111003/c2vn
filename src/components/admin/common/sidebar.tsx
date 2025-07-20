"use client";

import Link from "next/link";
import { adminRouters } from "~/constants/routers";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen relative">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Puzzler</h1>
        </div>

        <nav className="space-y-2">
          {adminRouters.map((route) => (
            <Link
              key={route.key}
              href={route.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <route.icon className="w-5 h-5" />
              <span>{route.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6">
        <Link href="/logout" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
          <i className="ri-logout-box-line w-5 h-5"></i>
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
