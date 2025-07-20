'use client';

import { useState } from 'react';
import { User, mockUsers, ITEMS_PER_PAGE, isWithin24Hours } from '~/constants/users';
import { AdminHeader } from '~/components/admin/common/AdminHeader';
import { AdminStats } from '~/components/admin/common/AdminStats';
import { AdminFilters } from '~/components/admin/common/AdminFilters';
import { UserTable } from '~/components/admin/users/UserTable';
import { Pagination } from '~/components/ui/pagination';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'inactive' | 'admin' | 'user'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (filterType) {
      case 'active':
        matchesFilter = user.status === 'active';
        break;
      case 'inactive':
        matchesFilter = user.status === 'inactive';
        break;
      case 'admin':
        matchesFilter = user.role === 'ADMIN';
        break;
      case 'user':
        matchesFilter = user.role === 'USER';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEdit = (user: User) => {
    // TODO: Implement edit user modal
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleRoleChange = (userId: string, role: 'USER' | 'ADMIN') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role } : user
    ));
  };

  const handleStatusChange = (userId: string, status: 'active' | 'inactive') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value as 'all' | 'active' | 'inactive' | 'admin' | 'user');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const stats = [
    { label: 'Total Users', value: users.length, color: 'default' as const },
    { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'green' as const },
    { label: 'Admins', value: users.filter(u => u.role === 'ADMIN').length, color: 'blue' as const },
    { label: 'Inactive', value: users.filter(u => u.status === 'inactive').length, color: 'red' as const },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'admin', label: 'Admins' },
    { value: 'user', label: 'Users' },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Users Management"
        description="Manage user accounts and permissions"
        buttonText="Add New User"
      />

      <AdminStats stats={stats} />

      <AdminFilters
        searchTerm={searchTerm}
        filterType={filterType}
        searchPlaceholder="Search users by name or email..."
        filterOptions={filterOptions}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <div className="bg-white rounded-lg shadow">
        <UserTable
          users={paginatedUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
} 