'use client';

import { useState } from 'react';
import { Tag, mockTags, ITEMS_PER_PAGE, isWithin24Hours } from '~/constants/tags';
import { AdminHeader } from '~/components/admin/common/AdminHeader';
import { AdminStats } from '~/components/admin/common/AdminStats';
import { AdminFilters } from '~/components/admin/common/AdminFilters';
import { TagTable } from '~/components/admin/tags/TagTable';
import { Pagination } from '~/components/ui/pagination';

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'newest'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'newest' && isWithin24Hours(tag.createdAt));
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTags.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTags = filteredTags.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
  };

  const handleSave = (tagId: string, newName: string, newDescription: string) => {
    setTags(tags.map(tag => 
      tag.id === tagId 
        ? { ...tag, name: newName, description: newDescription }
        : tag
    ));
    setEditingTag(null);
  };

  const handleDelete = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleCancel = () => {
    setEditingTag(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value as 'all' | 'newest');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const stats = [
    { label: 'Total Tags', value: tags.length, color: 'default' as const },
    { label: 'Active Tags', value: filteredTags.length, color: 'default' as const },
    { label: 'Total Posts', value: tags.reduce((sum, tag) => sum + tag.postCount, 0), color: 'blue' as const },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Tags' },
    { value: 'newest', label: 'Newest (24h)' },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Tags Management"
        description="Manage blog tags and categories"
        buttonText="Add New Tag"
      />

      <AdminStats stats={stats} />

      <AdminFilters
        searchTerm={searchTerm}
        filterType={filterType}
        searchPlaceholder="Search tags by name..."
        filterOptions={filterOptions}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="bg-white rounded-lg shadow">
        <TagTable
          tags={paginatedTags}
          editingTag={editingTag}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTags.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
} 