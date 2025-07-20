import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PostStatsProps {
  posts: any[];
}

export function PostStats({ posts }: PostStatsProps) {
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const archivedPosts = posts.filter(p => p.status === 'archived').length;
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);
  const chartData = [
    { name: 'Published', posts: publishedPosts, color: '#10B981' },
    { name: 'Draft', posts: draftPosts, color: '#F59E0B' },
    { name: 'Archived', posts: archivedPosts, color: '#6B7280' },
  ];

  const engagementData = [
    { name: 'Views', value: totalViews, color: '#3B82F6' },
    { name: 'Likes', value: totalLikes, color: '#EF4444' },
    { name: 'Comments', value: totalComments, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Posts</div>
          <div className="text-2xl font-bold text-gray-900">{totalPosts}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Published</div>
          <div className="text-2xl font-bold text-green-600">{publishedPosts}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Drafts</div>
          <div className="text-2xl font-bold text-yellow-600">{draftPosts}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Archived</div>
          <div className="text-2xl font-bold text-gray-600">{archivedPosts}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Post Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Views</div>
          <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Likes</div>
          <div className="text-2xl font-bold text-red-600">{totalLikes.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Comments</div>
          <div className="text-2xl font-bold text-purple-600">{totalComments.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
} 