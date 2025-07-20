export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Introduction to Cardano Smart Contracts',
    content: '# Introduction to Cardano Smart Contracts\n\nCardano is a third-generation blockchain platform that aims to solve the scalability, interoperability, and sustainability issues faced by other blockchain networks.\n\n## Key Features\n\n- **Plutus**: A functional programming language for smart contracts\n- **UTXO Model**: Unspent Transaction Output model for better scalability\n- **Proof of Stake**: Ouroboros consensus mechanism\n\n## Getting Started\n\nTo start developing on Cardano, you need to understand the basic concepts of UTXO and how transactions work in this ecosystem.',
    excerpt: 'Learn the basics of Cardano smart contracts and how to get started with Plutus development.',
    author: 'John Doe',
    status: 'published',
    tags: ['Cardano', 'Smart Contracts', 'Plutus'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 15,
  },
  {
    id: '2',
    title: 'DeFi Protocols on Cardano',
    content: '# DeFi Protocols on Cardano\n\nDecentralized Finance (DeFi) has been growing rapidly on the Cardano blockchain, offering various financial services without intermediaries.\n\n## Popular DeFi Protocols\n\n1. **SundaeSwap**: Decentralized exchange\n2. **Minswap**: Multi-pool DEX\n3. **WingRiders**: DEX with advanced features\n\n## Benefits of Cardano DeFi\n\n- Lower transaction fees\n- Better security\n- Environmental sustainability\n- Academic rigor',
    excerpt: 'Explore the growing DeFi ecosystem on Cardano and discover the best protocols available.',
    author: 'Jane Smith',
    status: 'published',
    tags: ['DeFi', 'Cardano', 'DEX'],
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    views: 890,
    likes: 67,
    comments: 18,
    shares: 12,
  },
  {
    id: '3',
    title: 'NFT Standards on Cardano',
    content: '# NFT Standards on Cardano\n\nCardano supports multiple NFT standards, each designed for specific use cases and requirements.\n\n## CIP-25: NFT Metadata Standard\n\nThis standard defines how NFT metadata should be structured and stored.\n\n## CIP-68: Advanced NFT Standard\n\nCIP-68 introduces advanced features for NFTs including:\n- Royalty mechanisms\n- Dynamic metadata\n- Complex ownership structures\n\n## Use Cases\n\n- Digital art\n- Gaming assets\n- Real estate tokens\n- Identity verification',
    excerpt: 'Understanding the different NFT standards available on Cardano and their use cases.',
    author: 'Mike Johnson',
    status: 'draft',
    tags: ['NFT', 'CIP-25', 'CIP-68'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: '4',
    title: 'Staking ADA: A Complete Guide',
    content: '# Staking ADA: A Complete Guide\n\nStaking is the process of participating in the Cardano network by delegating your ADA to stake pools.\n\n## How Staking Works\n\n1. **Choose a Stake Pool**: Research and select a reliable stake pool\n2. **Delegate Your ADA**: Use your wallet to delegate to the chosen pool\n3. **Earn Rewards**: Receive ADA rewards based on pool performance\n\n## Benefits of Staking\n\n- Earn passive income\n- Support network security\n- No lock-up period\n- Compound rewards',
    excerpt: 'Complete guide to staking ADA on Cardano and earning passive income.',
    author: 'Sarah Wilson',
    status: 'published',
    tags: ['Staking', 'ADA', 'Rewards'],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    views: 2100,
    likes: 145,
    comments: 34,
    shares: 28,
  },
  {
    id: '5',
    title: 'Cardano Governance and Voting',
    content: '# Cardano Governance and Voting\n\nCardano implements a decentralized governance system that allows ADA holders to participate in network decisions.\n\n## Voltaire Era\n\nThe Voltaire era introduces:\n- Treasury system\n- Voting mechanisms\n- Proposal submission\n- Community governance\n\n## How to Participate\n\n1. Register to vote\n2. Submit proposals\n3. Vote on proposals\n4. Earn rewards for participation',
    excerpt: 'Learn about Cardano governance and how to participate in network decisions.',
    author: 'David Brown',
    status: 'published',
    tags: ['Governance', 'Voting', 'Voltaire'],
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
    views: 1560,
    likes: 112,
    comments: 29,
    shares: 19,
  },
];

export const ITEMS_PER_PAGE = 6;

export function isWithin24Hours(dateString: string): boolean {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 24;
} 