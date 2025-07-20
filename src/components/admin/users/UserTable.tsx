import { Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { User } from '~/constants/users';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onRoleChange: (userId: string, role: 'USER' | 'ADMIN') => void;
  onStatusChange: (userId: string, status: 'active' | 'inactive') => void;
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  onRoleChange,
  onStatusChange,
}: UserTableProps) {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {user.role === 'ADMIN' ? (
                    <Shield className="h-4 w-4 text-blue-600 mr-2" />
                  ) : (
                    <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                    className="text-sm border-0 bg-transparent focus:ring-0 focus:outline-none"
                    title={`Change role for ${user.name}`}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.status}
                  onChange={(e) => onStatusChange(user.id, e.target.value as 'active' | 'inactive')}
                  className={`text-sm border-0 bg-transparent focus:ring-0 focus:outline-none ${
                    user.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}
                  title={`Change status for ${user.name}`}
                >
                  <option value="active" className="text-green-600">Active</option>
                  <option value="inactive" className="text-red-600">Inactive</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.lastLogin ? (
                  <div>
                    <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(user.lastLogin).toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">Never</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-900"
                    title={`Edit ${user.name}`}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                    title={`Delete ${user.name}`}
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