export interface Tag {
  id: string;
  name: string;
  postCount: number;
  createdAt: string;
  isEditing?: boolean;
}

export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Cardano',
    postCount: 15,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'DeFi',
    postCount: 8,
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'NFT',
    postCount: 12,
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'Smart Contracts',
    postCount: 6,
    createdAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    name: 'Plutus',
    postCount: 10,
    createdAt: '2024-01-11T11:30:00Z',
  },
  {
    id: '6',
    name: 'ADA',
    postCount: 20,
    createdAt: '2024-01-10T08:20:00Z',
  },
  {
    id: '7',
    name: 'Staking',
    postCount: 7,
    createdAt: '2024-01-09T13:10:00Z',
  },
  {
    id: '8',
    name: 'Governance',
    postCount: 4,
    createdAt: '2024-01-08T15:30:00Z',
  },
];

export const ITEMS_PER_PAGE = 6;

export function isWithin24Hours(dateString: string): boolean {
  const tagDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - tagDate.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 24;
} 