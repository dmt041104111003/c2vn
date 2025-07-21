export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  // Thêm các trường reaction cụ thể
  LIKE: number;
  HEART: number;
  HAHA: number;
  SAD: number;
  ANGRY: number;
  comments: number;
  shares: number;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Cardano Smart Contracts',
    content: '',
    author: 'John Doe',
    status: 'published',
    tags: ['Cardano'],
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
    views: 1200,
    LIKE: 30,
    HEART: 10,
    HAHA: 5,
    SAD: 2,
    ANGRY: 1,
    comments: 12,
    shares: 4,
  },
  {
    id: '2',
    title: 'DeFi on Cardano',
    content: '',
    author: 'Jane Smith',
    status: 'published',
    tags: ['DeFi'],
    createdAt: '2023-05-10T14:20:00Z',
    updatedAt: '2023-05-10T14:20:00Z',
    views: 900,
    LIKE: 20,
    HEART: 15,
    HAHA: 3,
    SAD: 1,
    ANGRY: 0,
    comments: 8,
    shares: 2,
  },
  {
    id: '3',
    title: 'NFT Standards',
    content: '',
    author: 'Mike Johnson',
    status: 'draft',
    tags: ['NFT'],
    createdAt: '2023-12-01T09:15:00Z',
    updatedAt: '2023-12-01T09:15:00Z',
    views: 500,
    LIKE: 10,
    HEART: 5,
    HAHA: 1,
    SAD: 0,
    ANGRY: 0,
    comments: 3,
    shares: 1,
  },
  {
    id: '4',
    title: 'Staking ADA',
    content: '',
    author: 'Sarah Wilson',
    status: 'published',
    tags: ['Staking'],
    createdAt: '2024-02-20T16:45:00Z',
    updatedAt: '2024-02-20T16:45:00Z',
    views: 2100,
    LIKE: 50,
    HEART: 20,
    HAHA: 7,
    SAD: 2,
    ANGRY: 1,
    comments: 20,
    shares: 8,
  },
  {
    id: '5',
    title: 'Cardano Governance',
    content: '',
    author: 'David Brown',
    status: 'archived',
    tags: ['Governance'],
    createdAt: '2024-06-11T11:30:00Z',
    updatedAt: '2024-06-11T11:30:00Z',
    views: 1560,
    LIKE: 40,
    HEART: 18,
    HAHA: 2,
    SAD: 1,
    ANGRY: 0,
    comments: 10,
    shares: 5,
  },
  {
    id: '6',
    title: 'Plutus Advanced',
    content: '',
    author: 'Alice',
    status: 'published',
    tags: ['Plutus'],
    createdAt: '2024-07-01T08:00:00Z',
    updatedAt: '2024-07-01T08:00:00Z',
    views: 800,
    LIKE: 15,
    HEART: 7,
    HAHA: 2,
    SAD: 0,
    ANGRY: 0,
    comments: 5,
    shares: 2,
  },
  {
    id: '7',
    title: 'Cardano 2022 Recap',
    content: '',
    author: 'Bob',
    status: 'archived',
    tags: ['Cardano'],
    createdAt: '2022-11-15T10:30:00Z',
    updatedAt: '2022-11-15T10:30:00Z',
    views: 600,
    LIKE: 8,
    HEART: 2,
    HAHA: 1,
    SAD: 0,
    ANGRY: 0,
    comments: 2,
    shares: 1,
  },
];

export const ITEMS_PER_PAGE = 6;

export function isWithin24Hours(dateString: string): boolean {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 24;
} 