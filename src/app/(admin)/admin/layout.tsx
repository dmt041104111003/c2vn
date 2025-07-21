'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Users, 
  Tags, 
  Menu,
  X
} from 'lucide-react';

const adminNavItems = [
  {
    title: 'Posts',
    href: '/admin/posts',
    icon: FileText,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Tags',
    href: '/admin/tags',
    icon: Tags,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} suppressHydrationWarning>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} suppressHydrationWarning />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white" suppressHydrationWarning>
          <div className="flex h-16 items-center justify-between px-4" suppressHydrationWarning>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              title="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4" suppressHydrationWarning>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col" suppressHydrationWarning>
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200" suppressHydrationWarning>
          <div className="flex h-16 items-center px-4" suppressHydrationWarning>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4" suppressHydrationWarning>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="lg:pl-64" suppressHydrationWarning>
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden" suppressHydrationWarning>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            title="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6" suppressHydrationWarning>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          </div>
        </div>
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 