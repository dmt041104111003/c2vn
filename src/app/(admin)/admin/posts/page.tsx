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

export default function PostsPage() {
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
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleStatusChange = (postId: string, status: 'draft' | 'published' | 'archived') => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status } : post
    ));
  };

  const handleSavePost = (newPost: any) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
    };
    setPosts([postWithId, ...posts]);
    setActiveTab('management');
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

  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Posts Management"
        description="Manage blog posts and content"
        buttonText="Create New Post"
        onAddClick={() => setActiveTab('create')}
      />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
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
        <div className="space-y-6">
          <PostStats posts={posts} />
          <AdminFilters
            searchTerm={searchTerm}
            filterType={filterType}
            searchPlaceholder="Search posts by title, content, or author..."
            filterOptions={filterOptions}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />

          <div className="bg-white rounded-lg shadow">
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
        </div>
      ) : (
        <div className="min-h-[600px]">
          <PostEditor onSave={handleSavePost} />
        </div>
      )}
    </div>
  );
} 