import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onAddClick?: () => void;
}

export function AdminHeader({ title, description, buttonText, onAddClick }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
      <button 
        onClick={onAddClick}
        className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        {buttonText}
      </button>
    </div>
  );
} 