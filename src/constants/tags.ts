export interface Tag {
  id: string;
  name: string;
  description: string;
  postCount: number;
  createdAt: string;
  isEditing?: boolean;
}

export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Cardano',
    description: 'Blockchain platform and cryptocurrency',
    postCount: 15,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'DeFi',
    description: 'Decentralized Finance applications',
    postCount: 8,
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'NFT',
    description: 'Non-Fungible Tokens',
    postCount: 12,
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'Smart Contracts',
    description: 'Self-executing contracts on blockchain',
    postCount: 6,
    createdAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    name: 'Plutus',
    description: 'Cardano smart contract platform',
    postCount: 10,
    createdAt: '2024-01-11T11:30:00Z',
  },
  {
    id: '6',
    name: 'ADA',
    description: 'Cardano native cryptocurrency',
    postCount: 20,
    createdAt: '2024-01-10T08:20:00Z',
  },
  {
    id: '7',
    name: 'Staking',
    description: 'Earning rewards by delegating ADA',
    postCount: 7,
    createdAt: '2024-01-09T13:10:00Z',
  },
  {
    id: '8',
    name: 'Governance',
    description: 'Cardano governance and voting',
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