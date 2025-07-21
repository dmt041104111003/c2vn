"use client";

import React, { useState } from 'react';
import { X, Youtube, ImageIcon } from 'lucide-react';

interface Media {
  type: 'youtube' | 'image';
  url: string;
  id: string;
}

interface MediaInputProps {
  onMediaAdd?: (media: Media) => void;
  onMediaRemove?: () => void;
}

export default function MediaInput({ onMediaAdd, onMediaRemove }: MediaInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const [error, setError] = useState('');

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const isImageUrl = (url: string): boolean => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    return imageExtensions.test(url) || url.includes('picsum.photos') || url.includes('images.unsplash.com');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError('');

    if (value.trim()) {
      const videoId = extractYouTubeVideoId(value);
      if (videoId) {
        const media = {
          type: 'youtube' as const,
          url: value,
          id: videoId
        };
        setCurrentMedia(media);
        if (onMediaAdd) {
          onMediaAdd(media);
        }
        return;
      }

      if (isImageUrl(value)) {
        const media = {
          type: 'image' as const,
          url: value,
          id: value
        };
        setCurrentMedia(media);
        if (onMediaAdd) {
          onMediaAdd(media);
        }
        return;
      }

      setCurrentMedia(null);
      if (onMediaRemove) {
        onMediaRemove();
      }
    } else {
      setCurrentMedia(null);
      if (onMediaRemove) {
        onMediaRemove();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text/plain');
    setInputValue(pastedText);
    const videoId = extractYouTubeVideoId(pastedText);
    if (videoId) {
      const media = {
        type: 'youtube' as const,
        url: pastedText,
        id: videoId
      };
      setCurrentMedia(media);
      if (onMediaAdd) {
        onMediaAdd(media);
      }
      setError('');
      return;
    }

    if (isImageUrl(pastedText)) {
      const media = {
        type: 'image' as const,
        url: pastedText,
        id: pastedText
      };
      setCurrentMedia(media);
      if (onMediaAdd) {
        onMediaAdd(media);
      }
      setError('');
      return;
    }

    setCurrentMedia(null);
  };

  const clearInput = () => {
    setInputValue('');
    setCurrentMedia(null);
    setError('');
    if (onMediaRemove) {
      onMediaRemove();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onPaste={handlePaste}
          placeholder="Paste image or YouTube link here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {inputValue && (
          <button
            onClick={clearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            title="Clear input"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {currentMedia && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-3">
            {currentMedia.type === 'youtube' ? (
              <Youtube className="h-5 w-5 text-red-500" />
            ) : (
              <ImageIcon className="h-5 w-5 text-blue-500" />
            )}
            <span className="font-medium">
              {currentMedia.type === 'youtube' ? 'YouTube Video' : 'Image'} Preview
            </span>
          </div>

          {currentMedia.type === 'youtube' ? (
            <div className="youtube-video">
              <iframe
                src={`https://www.youtube.com/embed/${currentMedia.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-48 rounded-lg"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={currentMedia.url}
                alt="Preview"
                className="max-w-full max-h-48 rounded-lg shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  setError('Cannot load image. Please check the link.');
                }}
              />
            </div>
          )}

          <div className="mt-3 text-sm text-gray-600">
            <div className="break-all">{currentMedia.url}</div>
          </div>
        </div>
      )}
    </div>
  );
} 