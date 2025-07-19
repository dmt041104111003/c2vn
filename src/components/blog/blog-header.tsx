"use client";

import { useState } from "react";
import { blogFilters, BlogFilter } from "~/constants/blogs";
import { Search, Filter, Menu } from "lucide-react";

interface BlogHeaderProps {
  onMenuClick?: () => void;
}

export default function BlogHeader({ onMenuClick }: BlogHeaderProps) {
  const [activeFilter, setActiveFilter] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return (
    <div className="border-b border-white/20 bg-gray-900/50 sticky top-0 z-10">
      <div className="p-4 lg:p-6">
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button 
            className="p-2 text-gray-300 hover:text-white" 
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex space-x-4 lg:space-x-6 overflow-x-auto">
            {blogFilters.map((filter: BlogFilter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`pb-2 whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? "text-white font-semibold border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {filter.title}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="relative flex-1 lg:flex-none">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 px-3 lg:px-4 py-2 border border-gray-600 rounded-lg text-sm bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button className="px-3 lg:px-4 py-2 border border-gray-600 rounded-lg text-sm text-gray-300 whitespace-nowrap flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">This Month</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 