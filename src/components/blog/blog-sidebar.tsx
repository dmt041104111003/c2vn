"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { blogCategories, blogQuickLinks } from "~/constants/blogs";

interface BlogSidebarProps {
  onClose?: () => void;
}

export default function BlogSidebar({ onClose }: BlogSidebarProps) {
  return (
    <aside 
      className="w-80 bg-gray-900/50 border-r border-white/20 p-4 lg:p-6 sticky top-0 h-screen overflow-y-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <style jsx>{`
        aside::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-300 hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="mb-6 lg:mb-8">
        <div className="mb-4 lg:mb-6">
          <div className="h-1 w-24 lg:w-32 bg-gradient-to-r from-blue-500 to-transparent shadow-lg shadow-blue-500/50 mb-2"></div>
          <div className="h-1 w-12 lg:w-16 bg-gradient-to-r from-white/60 to-transparent ml-6 lg:ml-8 mb-4"></div>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="h-1 w-8 lg:w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold text-white">Blog</h1>
          </div>
        </div>
        <p className="max-w-3xl text-xs lg:text-sm text-gray-300">Discover insights, tutorials, and updates from the Cardano ecosystem</p>
      </div>
      
      <nav className="space-y-1">
        <div className="mb-4 lg:mb-6">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2 lg:mb-3">
            Categories
          </h3>
          <ul className="space-y-1">
            {blogCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blog?category=${category.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-300 hover:bg-white/10 rounded transition-colors"
                >
                  <span>{category.title}</span>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4 lg:mb-6">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2 lg:mb-3">
            Quick Links
          </h3>
          <ul className="space-y-1">
            {blogQuickLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-300 hover:bg-white/10 rounded transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
} 