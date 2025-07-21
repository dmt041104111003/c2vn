'use client';

import { useState } from 'react';
import { Post, mockPosts, ITEMS_PER_PAGE, isWithin24Hours } from '~/constants/posts';
import { AdminHeader } from '~/components/admin/common/AdminHeader';
import { AdminFilters } from '~/components/admin/common/AdminFilters';
import { PostTable } from '~/components/admin/posts/PostTable';
import { PostStats } from '~/components/admin/posts/PostStats';
import { PostEditor } from '~/components/admin/posts/PostEditor';
import { Pagination } from '~/components/ui/pagination';
import { BarChart3, Edit3 } from 'lucide-react';

export function PostsPageClient() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'management' | 'create'>('management');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (filterType) {
      case 'published':
        matchesFilter = post.status === 'published';
        break;
      case 'draft':
        matchesFilter = post.status === 'draft';
        break;
      case 'archived':
        matchesFilter = post.status === 'archived';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEdit = (post: Post) => {
    console.log('Edit post:', post);
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleStatusChange = (postId: string, newStatus: 'published' | 'draft' | 'archived') => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value as 'all' | 'published' | 'draft' | 'archived');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSavePost = (newPost: any) => {
    const post: Post = {
      id: `post-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      excerpt: newPost.excerpt,
      author: newPost.author,
      status: newPost.status,
      tags: newPost.tags,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
      views: newPost.views,
      likes: newPost.likes,
      comments: newPost.comments,
      shares: newPost.shares,
    };
    
    setPosts([post, ...posts]);
    setActiveTab('management');
  };

  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <AdminHeader
        title="Posts Management"
        description="Manage blog posts and content"
        buttonText="Create New Post"
        onAddClick={() => setActiveTab('create')}
      />

      <div className="border-b border-gray-200" suppressHydrationWarning>
        <nav className="-mb-px flex space-x-8" suppressHydrationWarning>
          <button
            onClick={() => setActiveTab('management')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'management'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Management & Statistics
            </div>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Edit3 className="h-4 w-4 mr-2" />
              Create Post
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'management' ? (
        <>
          <PostStats posts={posts} />

          <AdminFilters
            searchTerm={searchTerm}
            filterType={filterType}
            searchPlaceholder="Search posts by title, content, or author..."
            filterOptions={filterOptions}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />

          <div className="bg-white rounded-lg shadow" suppressHydrationWarning>
            <PostTable
              posts={paginatedPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPosts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <PostEditor onSave={handleSavePost} />
      )}
    </div>
  );
}

export default PostsPageClient; 