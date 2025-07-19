"use client";

import { useState } from "react";
import BlogSidebar from "~/components/blog/blog-sidebar";
import BlogHeader from "~/components/blog/blog-header";
import BlogContent from "~/components/blog/blog-content";

export default function BlogsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <main className="relative pt-20">
      <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900">
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        <div className={`fixed lg:relative z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <BlogSidebar onClose={() => setIsMobileSidebarOpen(false)} />
        </div>
        <div className="flex-1 w-full">
          <BlogHeader onMenuClick={toggleMobileSidebar} />
          <BlogContent />
        </div>
      </div>
    </main>
  );
}
