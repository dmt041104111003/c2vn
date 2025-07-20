import blockies from 'blockies-identicon';

export function generateWalletAvatar(address: string): string {
  try {
    const canvas = blockies.create({
      seed: address.toLowerCase(),
      size: 8,
      scale: 8,
      spotcolor: '#000',
    });

    return canvas.toDataURL();
  } catch (error) {
    console.error('Error generating identicon:', error);
  }
}
