import { Edit, Trash2, Eye, EyeOff, Archive, FileText, MessageSquare, Heart, Share2 } from 'lucide-react';
import { Post } from '~/constants/posts';

interface PostTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
  onStatusChange: (postId: string, status: 'draft' | 'published' | 'archived') => void;
}

export function PostTable({
  posts,
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
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
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
              Stats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.excerpt}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{post.author}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={post.status}
                  onChange={(e) => onStatusChange(post.id, e.target.value as 'draft' | 'published' | 'archived')}
                  className={`text-sm px-2 py-1 rounded-full border-0 focus:ring-0 focus:outline-none ${getStatusColor(post.status)}`}
                  title={`Change status for ${post.title}`}
                >
                  <option value="draft" className="text-yellow-600">Draft</option>
                  <option value="published" className="text-green-600">Published</option>
                  <option value="archived" className="text-gray-600">Archived</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {post.views}
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {post.comments}
                  </div>
                  <div className="flex items-center">
                    <Share2 className="h-3 w-3 mr-1" />
                    {post.shares}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
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