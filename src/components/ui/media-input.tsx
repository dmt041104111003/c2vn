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
  mediaType?: 'image' | 'youtube';
}

export default function MediaInput({ onMediaAdd, onMediaRemove, mediaType = 'image' }: MediaInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const media = { type: 'image' as const, url: dataUrl, id: dataUrl };
      setCurrentMedia(media);
      setInputValue(dataUrl);
      if (onMediaAdd) {
        onMediaAdd(media);
      }
    };
    reader.readAsDataURL(file);
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
      {mediaType === 'image' && (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded hover:bg-blue-200 border border-blue-200"
            onClick={() => fileInputRef.current?.click()}
            title="Upload image from your computer"
          >
            Upload image
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            title="Upload image from your computer"
            placeholder="Choose image file..."
          />
          {currentMedia?.type === 'image' && (
            <img
              src={currentMedia.url}
              alt="Preview"
              className="max-w-full max-h-48 rounded-lg shadow-md"
            />
          )}
        </div>
      )}
      {mediaType === 'youtube' && (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste YouTube video link here..."
            onChange={e => onMediaAdd && onMediaAdd({ type: 'youtube', url: e.target.value, id: e.target.value })}
          />
          {currentMedia?.type === 'youtube' && (
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
          )}
        </div>
      )}
    </div>
  );
} 