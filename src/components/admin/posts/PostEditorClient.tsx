'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Tag, User, X } from 'lucide-react';
import { mockTags } from '~/constants/tags';
import { TipTapEditor, TipTapPreview } from '~/components/ui/tiptap-editor';
import MediaInput from '~/components/ui/media-input';

interface PostEditorClientProps {
  onSave: (post: any) => void;
}

export function PostEditorClient({ onSave }: PostEditorClientProps) {
  const [post, setPost] = useState({
    selectedTags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    content: '',
    media: [] as Array<{ type: 'image' | 'youtube'; url: string; id: string }>,
  });

  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagName: string) => {
    setPost(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagName)
        ? prev.selectedTags.filter(tag => tag !== tagName)
        : [...prev.selectedTags, tagName]
    }));
  };

  const handleRemoveTag = (tagName: string) => {
    setPost(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(tag => tag !== tagName)
    }));
  };

  const handleMediaAdd = (media: { type: 'image' | 'youtube'; url: string; id: string }) => {
    setPost(prev => ({
      ...prev,
      media: [media]
    }));
  };

  const handleRemoveMedia = () => {
    setPost(prev => ({
      ...prev,
      media: []
    }));
  };

  const handleSave = () => {
    const postData = {
      ...post,
      title: `Post ${Date.now()}`, 
      excerpt: post.content.substring(0, 100) + '...', 
      author: 'Admin User',
      tags: post.selectedTags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    onSave(postData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left"
                >
                  {post.selectedTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {post.selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            title={`Remove ${tag} tag`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">Select tags...</span>
                  )}
                </button>

                {showTagDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="p-2">
                      {mockTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagToggle(tag.name)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                            post.selectedTags.includes(tag.name) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                          title={`Select ${tag.name} tag`}
                        >
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-2" />
                            {tag.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media (Images/YouTube)
              </label>
                              <MediaInput onMediaAdd={handleMediaAdd} onMediaRemove={handleRemoveMedia} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={post.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                title="Select post status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <TipTapEditor
                content={post.content}
                onChange={(content: string) => handleInputChange('content', content)}
                placeholder="Start writing your post... You can paste HTML content from any website and it will be automatically converted to proper format!"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Preview</h3>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            Admin User
          </div>
        </div>

        <div className="prose max-w-none">
          {post.selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.media.length > 0 && (
            <div className="mb-6">
              <div className="space-y-4">
                {post.media.map((media, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    {media.type === 'youtube' ? (
                      <div className="youtube-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${media.id}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-64"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <img
                          src={media.url}
                          alt={`Media ${index + 1}`}
                          className="max-w-full max-h-64 rounded-lg shadow-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="text-red-500 text-center py-8">Cannot load image</div>';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {post.content ? (
            <TipTapPreview content={post.content} />
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Start writing to see the preview...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 