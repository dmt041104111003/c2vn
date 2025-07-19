export default function BlogPostSkeleton() {
  return (
    <div className="bg-gray-800/50 border border-white/20 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm backdrop-blur-sm mb-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded w-32 mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="w-5 h-5 bg-gray-700 rounded"></div>
      </div>
      <div className="mb-4">
        <div className="mb-3">
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mb-3">
          <div className="w-full h-48 lg:h-64 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        <div className="h-6 bg-gray-700 rounded-full w-16"></div>
        <div className="h-6 bg-gray-700 rounded-full w-20"></div>
        <div className="h-6 bg-gray-700 rounded-full w-14"></div>
      </div>
      <div className="flex items-center justify-between py-3 border-b border-white/10 mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-3 bg-gray-700 rounded w-8"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-3 bg-gray-700 rounded w-16"></div>
          <div className="h-3 bg-gray-700 rounded w-12"></div>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-white/10 mb-4">
        <div className="h-8 bg-gray-700 rounded-lg w-16"></div>
        <div className="h-8 bg-gray-700 rounded-lg w-20"></div>
        <div className="h-8 bg-gray-700 rounded-lg w-16"></div>
        <div className="h-8 bg-gray-700 rounded-lg w-16"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-32 mb-4"></div>
    </div>
  );
} 