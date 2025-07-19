import { images } from "~/public/images";

import { StaticImageData } from "next/image";

export interface BlogPost {
  id: string;
  title: string;
  image: string | StaticImageData;
  date: string;
  author: string;
  authorAvatar?: string;
  authorLocation?: string;
  action: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface BlogCategory {
  id: string;
  title: string;
  count: number;
}

export interface BlogFilter {
  id: string;
  title: string;
  active: boolean;
}

export interface BlogComment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: BlogComment[];
}

export interface BlogUser {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  isOnline?: boolean;
}

export interface BlogQuickLink {
  id: string;
  title: string;
  href: string;
}

export const additionalCommentsTemplates = [
  {
    author: "New User 1",
    authorAvatar: "bg-green-600",
    content: "This is an additional comment loaded on demand!",
    timestamp: "Just now",
    likes: 2,
  },
  {
    author: "New User 2",
    authorAvatar: "bg-purple-600",
    content: "Another comment loaded when clicking 'Load more'.",
    timestamp: "Just now",
    likes: 1,
  },
  {
    author: "New User 3",
    authorAvatar: "bg-orange-600",
    content: "Great content! Thanks for sharing this information.",
    timestamp: "Just now",
    likes: 3,
  },
  {
    author: "New User 4",
    authorAvatar: "bg-pink-600",
    content: "This article is really helpful and informative.",
    timestamp: "Just now",
    likes: 4,
  },
  {
    author: "New User 5",
    authorAvatar: "bg-indigo-600",
    content: "I've been looking for this kind of detailed analysis.",
    timestamp: "Just now",
    likes: 2,
  },
] as const;

export const blogCategories: BlogCategory[] = [
  { id: "all", title: "All Posts", count: 25 },
  { id: "blockchain", title: "Blockchain", count: 8 },
  { id: "defi", title: "DeFi", count: 6 },
  { id: "governance", title: "Governance", count: 5 },
  { id: "technology", title: "Technology", count: 4 },
  { id: "treasury", title: "Treasury", count: 2 },
];

export const blogFilters: BlogFilter[] = [
  { id: "latest", title: "Latest", active: true },
  { id: "popular", title: "Popular", active: false },
  { id: "trending", title: "Trending", active: false },
];

export const blogQuickLinks: BlogQuickLink[] = [
  { id: "all", title: "All Posts", href: "/blog" },
  { id: "latest", title: "Latest Posts", href: "/blog?filter=latest" },
  { id: "popular", title: "Popular Posts", href: "/blog?filter=popular" },
  { id: "trending", title: "Trending", href: "/blog?filter=trending" },
];

export const blogUsers: BlogUser[] = [
  { id: "1", name: "James Dunseith", location: "San Francisco, CA", isOnline: true },
  { id: "2", name: "Mira Chan", location: "Singapore", isOnline: false },
  { id: "3", name: "Luis Fernandez", location: "Madrid, Spain", isOnline: true },
  { id: "4", name: "Emily Hart", location: "London, UK", isOnline: false },
  { id: "5", name: "Keiran Patel", location: "Toronto, Canada", isOnline: true },
];

export const trendingTopics = [
  "#blockchain",
  "#cryptocurrency", 
  "#defi",
  "#governance",
  "#technology",
  "#innovation",
];

export const sampleComment: BlogComment = {
  id: "sample-1",
  author: "John Doe",
  authorAvatar: "bg-gray-700",
  content: "Great insights on treasury management! This is exactly what the ecosystem needs.",
  timestamp: "2 hours ago",
  likes: 8,
};

export const mockComments: BlogComment[] = [
  {
    id: "1",
    author: "John Doe",
    authorAvatar: "bg-gray-700",
    content: "Great insights on treasury management! This is exactly what the ecosystem needs.",
    timestamp: "2 hours ago",
    likes: 8,
  },
  {
    id: "2",
    author: "Sarah Wilson",
    authorAvatar: "bg-green-600",
    content: "The diversification strategies mentioned here are crucial for DAO sustainability.",
    timestamp: "1 hour ago",
    likes: 5,
  },
  {
    id: "3",
    author: "Mike Chen",
    authorAvatar: "bg-blue-600",
    content: "I've been following this project for months. The transparency is impressive.",
    timestamp: "45 minutes ago",
    likes: 12,
  },
  {
    id: "4",
    author: "Emma Rodriguez",
    authorAvatar: "bg-purple-600",
    content: "This article really helped me understand the risks involved in DAO treasuries.",
    timestamp: "30 minutes ago",
    likes: 7,
  },
  {
    id: "5",
    author: "David Kim",
    authorAvatar: "bg-orange-600",
    content: "The multi-sig vs smart contract comparison was eye-opening. Great analysis!",
    timestamp: "15 minutes ago",
    likes: 9,
  },
  {
    id: "6",
    author: "Alex Thompson",
    authorAvatar: "bg-pink-600",
    content: "This is exactly what I was looking for. The practical examples are very helpful.",
    timestamp: "10 minutes ago",
    likes: 6,
  },
  {
    id: "7",
    author: "Maria Garcia",
    authorAvatar: "bg-indigo-600",
    content: "The risk management section is particularly well explained. Great work!",
    timestamp: "8 minutes ago",
    likes: 11,
  },
  {
    id: "8",
    author: "Robert Johnson",
    authorAvatar: "bg-yellow-600",
    content: "I've implemented some of these strategies in our DAO. The results are promising.",
    timestamp: "5 minutes ago",
    likes: 4,
  },
  {
    id: "9",
    author: "Lisa Wang",
    authorAvatar: "bg-red-600",
    content: "The governance implications are fascinating. This could revolutionize how we think about DAOs.",
    timestamp: "3 minutes ago",
    likes: 15,
  },
  {
    id: "10",
    author: "Carlos Martinez",
    authorAvatar: "bg-teal-600",
    content: "Excellent breakdown of the technical aspects. The diagrams really help clarify the concepts.",
    timestamp: "2 minutes ago",
    likes: 8,
  },
  {
    id: "11",
    author: "Anna Lee",
    authorAvatar: "bg-cyan-600",
    content: "This article addresses many of the concerns I had about DAO treasury management.",
    timestamp: "1 minute ago",
    likes: 7,
  },
  {
    id: "12",
    author: "Michael Brown",
    authorAvatar: "bg-lime-600",
    content: "The comparison between different approaches is very insightful. Well researched!",
    timestamp: "Just now",
    likes: 9,
  },
  {
    id: "13",
    author: "Jennifer Davis",
    authorAvatar: "bg-amber-600",
    content: "I appreciate the real-world examples. Makes the concepts much more accessible.",
    timestamp: "Just now",
    likes: 6,
  },
  {
    id: "14",
    author: "Thomas Wilson",
    authorAvatar: "bg-emerald-600",
    content: "The security considerations are spot on. This is crucial for any DAO implementation.",
    timestamp: "Just now",
    likes: 12,
  },
  {
    id: "15",
    author: "Rachel Green",
    authorAvatar: "bg-violet-600",
    content: "Great article! I'll be sharing this with my team. The practical tips are invaluable.",
    timestamp: "Just now",
    likes: 10,
  },
];

export const blogs: BlogPost[] = [
  {
    id: "1",
    title: "Beyond Financial Sovereignty: Democratizing Treasury Administration",
    image: images.landing01,
    date: "2025-07-14",
    author: "James Dunseith",
    authorLocation: "San Francisco, CA",
    action: "Blog Post",
    slug: "beyond-financial-sovereignty",
    excerpt: "Explore how decentralized treasury tools are reshaping the way DAOs manage capital and make collaborative decisions.",
    category: "treasury",
    tags: ["Blockchain", "Treasury", "DeFi"],
    likes: 128,
    comments: 45,
    shares: 12,
    views: 2340,
  },
  {
    id: "2",
    title: "The Future of On-Chain Governance: Risks & Opportunities",
    image: images.landing02,
    date: "2025-07-10",
    author: "Mira Chan",
    authorLocation: "Singapore",
    action: "Blog Post",
    slug: "onchain-governance-risks-opportunities",
    excerpt: "An in-depth look at the growing field of on-chain governance, and what it means for transparency, accountability, and voter fatigue.",
    category: "governance",
    tags: ["Governance", "Blockchain", "Technology"],
    likes: 156,
    comments: 67,
    shares: 23,
    views: 3120,
  },
  {
    id: "3",
    title: "Treasury Diversification in Volatile Markets",
    image: images.landing03,
    date: "2025-06-28",
    author: "Luis Fernandez",
    authorLocation: "Madrid, Spain",
    action: "Blog Post",
    slug: "treasury-diversification-strategies",
    excerpt: "Discover strategies DAOs are using to protect their treasuries during turbulent market cycles without compromising decentralization.",
    category: "treasury",
    tags: ["DeFi", "Treasury", "Risk Management"],
    likes: 89,
    comments: 34,
    shares: 8,
    views: 1890,
  },
  {
    id: "4",
    title: "Designing Incentive Systems That Actually Work",
    image: images.landing04,
    date: "2025-06-15",
    author: "Emily Hart",
    action: "Blog Post",
    slug: "dao-incentive-mechanisms",
    excerpt: "A practical guide to creating fair and effective incentive systems for contributors in decentralized organizations.",
    category: "governance",
    tags: ["Governance", "Incentives", "DAO"],
    likes: 203,
    comments: 78,
    shares: 31,
    views: 4560,
  },
  {
    id: "5",
    title: "Multi-Sig vs Smart Contract: Choosing the Right DAO Treasury Stack",
    image: images.landing01,
    date: "2025-05-30",
    author: "Keiran Patel",
    authorLocation: "Toronto, Canada",
    action: "Blog Post",
    slug: "multisig-vs-smart-contract",
    excerpt: "Understand the pros and cons of different treasury control mechanisms, from classic multisigs to advanced programmable contracts.",
    category: "technology",
    tags: ["Technology", "Smart Contracts", "Security"],
    likes: 167,
    comments: 52,
    shares: 19,
    views: 2980,
  },
];
