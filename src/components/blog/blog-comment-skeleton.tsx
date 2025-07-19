export default function BlogCommentSkeleton() {
  return (
    <div className="flex items-start space-x-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0"></div>
      <div className="flex-1">
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-600 rounded w-20"></div>
            <div className="h-3 bg-gray-600 rounded w-16"></div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-3 bg-gray-600 rounded w-8"></div>
            <div className="h-3 bg-gray-600 rounded w-12"></div>
            <div className="h-3 bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 