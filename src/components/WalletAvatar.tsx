'use client';

import { generateWalletAvatar } from '../lib/wallet-avatar';

interface WalletAvatarProps {
  address: string | null;
  size?: number;
  className?: string;
}

export function WalletAvatar({ 
  address, 
  size = 40, 
  className = ''
}: WalletAvatarProps) {
  if (!address) {
    return (
      <div 
        className={`bg-gray-300 rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const avatarUrl = generateWalletAvatar(address);

  return (
    <img
      src={avatarUrl}
      alt="Wallet Avatar"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
} 