import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocBreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function DocBreadcrumb({ items }: DocBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <div className="w-4 h-4 flex items-center justify-center mx-2">
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
} 