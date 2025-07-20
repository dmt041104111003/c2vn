export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'USER',
    status: 'active',
    createdAt: '2024-01-14T14:20:00Z',
    lastLogin: '2024-01-19T09:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'USER',
    status: 'inactive',
    createdAt: '2024-01-13T09:15:00Z',
    lastLogin: '2024-01-18T16:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2024-01-12T16:45:00Z',
    lastLogin: '2024-01-20T11:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'USER',
    status: 'active',
    createdAt: '2024-01-11T11:30:00Z',
    lastLogin: '2024-01-19T13:20:00Z',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'USER',
    status: 'inactive',
    createdAt: '2024-01-10T08:20:00Z',
    lastLogin: '2024-01-17T10:10:00Z',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'USER',
    status: 'active',
    createdAt: '2024-01-09T13:10:00Z',
    lastLogin: '2024-01-20T08:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2024-01-08T15:30:00Z',
    lastLogin: '2024-01-20T16:20:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
  },
];

export const ITEMS_PER_PAGE = 6;

export function isWithin24Hours(dateString: string): boolean {
  const userDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - userDate.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 24;
} 