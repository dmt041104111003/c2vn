import { Edit, Trash2, Eye, EyeOff, Archive, MessageSquare, Heart, Share2 } from 'lucide-react';
import { Post } from '~/constants/posts';

interface PostTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
  onStatusChange: (postId: string, status: 'draft' | 'published' | 'archived') => void;
}

export function PostTable({
  posts = [],
  onEdit,
  onDelete,
  onStatusChange,
}: PostTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'archived':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-[700px] md:min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Post
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Update
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(posts) && posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{post.author}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                  ${(post.status && String(post.status).toLowerCase() === 'published') ? 'bg-green-100 text-green-700' : ''}
                  ${(post.status && String(post.status).toLowerCase() === 'draft') ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${(post.status && String(post.status).toLowerCase() === 'archived') ? 'bg-gray-100 text-gray-700' : ''}
                `}>
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(post.tags) && post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={typeof tag === 'object' && tag !== null && (tag as any).id ? (tag as any).id : index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {typeof tag === 'object' && tag !== null && (tag as any).name ? (tag as any).name : String(tag)}
                    </span>
                  ))}
                  {Array.isArray(post.tags) && post.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.createdAt ?
                  new Date(post.createdAt).toLocaleString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: false
                  })
                  : ''}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.updatedAt ?
                  new Date(post.updatedAt).toLocaleString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: false
                  })
                  : ''}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(post)}
                    className="text-blue-600 hover:text-blue-900"
                    title={`Edit ${post.title}`}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="text-red-600 hover:text-red-900"
                    title={`Delete ${post.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 