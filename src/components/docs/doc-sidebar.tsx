"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { docCategories, DocCategory } from "~/constants/docs";
import { useState } from "react";


export default function DocSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "new-to-cardano",
    "learn",
    "explore-more",
    "cardano-evolution"
  ]);

  const isActive = (href: string) => {
    if (pathname === "/docs" && href === "/docs/introduction") {
      return true;
    }
    return pathname === href;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => {
    return expandedSections.includes(sectionId);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-1">
          {docCategories.map((category: DocCategory) => (
            <div key={category.id} className="mb-6">
              {category.title && (
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  {category.title}
                </h3>
              )}
              <ul className="space-y-1">
                {category.expandable ? (
                  <li>
                    <button
                      onClick={() => toggleSection(category.id)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      <span className="font-medium">{category.title}</span>
                      {isExpanded(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {isExpanded(category.id) && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {category.sections.map((section) => (
                          <li key={section.id}>
                            <Link
                              href={section.href}
                              className={`block px-3 py-2 text-sm rounded transition-colors ${
                                isActive(section.href)
                                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {section.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  category.sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={section.href}
                        target={section.external ? "_blank" : undefined}
                        rel={section.external ? "noopener noreferrer" : undefined}
                        className={`flex items-center px-3 py-2 text-sm rounded transition-colors ${
                          isActive(section.href)
                            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex-1">{section.title}</span>
                        {section.external && (
                          <ExternalLink className="h-4 w-4 ml-2" />
                        )}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
} 