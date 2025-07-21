'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Tag, User, X } from 'lucide-react';
import { TipTapEditor, TipTapPreview } from '~/components/ui/tiptap-editor';
import MediaInput from '~/components/ui/media-input';
import { useToastContext } from '~/components/toast-provider';

interface Tag {
  id: string;
  name: string;
}

interface PostEditorClientProps {
  onSave: (post: any) => void;
  post?: any;
}

export function PostEditorClient({ onSave, post }: PostEditorClientProps) {
  const [postState, setPostState] = useState({
    title: '',
    selectedTags: [] as string[],
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    content: '',
    media: [] as Array<{ type: 'image' | 'youtube'; url: string; id: string }>,
  });

  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'youtube'>('image');
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const { showSuccess, showError } = useToastContext();

  useEffect(() => {
    if (post) {
      setPostState({
        title: post.title || '',
        selectedTags: post.tags ? post.tags.map((t: any) => t.name || t) : [],
        status: post.status || 'DRAFT',
        content: post.content || '',
        media: post.media || [],
      });
    }
  }, [post]);

  useEffect(() => {
    const fetchTags = async () => {
      setLoadingTags(true);
      try {
        const res = await fetch('/api/admin/tags', { credentials: 'include' });
        const data = await res.json();
        if (Array.isArray(data.tags)) setTags(data.tags);
      } catch {}
      setLoadingTags(false);
    };
    fetchTags();
  }, []);

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
    setPostState(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveTag = (tagName: string) => {
    setPostState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(tag => tag !== tagName)
    }));
  };

  const handleMediaAdd = (media: { type: 'image' | 'youtube'; url: string; id: string }) => {
    setPostState(prev => ({
      ...prev,
      media: [media]
    }));
  };

  const handleRemoveMedia = () => {
    setPostState(prev => ({
      ...prev,
      media: []
    }));
  };

  const handleTagToggle = (tagName: string) => {
    setPostState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagName)
        ? prev.selectedTags.filter(tag => tag !== tagName)
        : [...prev.selectedTags, tagName]
    }));
  };

  const handleSave = async () => {

    if (!postState.title || !postState.title.trim()) {
      showError('Title is required!');
      return;
    }
    if (!postState.content || !postState.content.trim()) {
      showError('Content is required!');
      return;
    }
    if (!postState.status) {
      showError('Status is required!');
      return;
    }
    if (!postState.selectedTags || postState.selectedTags.length === 0) {
      showError('At least one tag is required!');
      return;
    }
    if (!postState.media || postState.media.length === 0) {
      showError('Image or YouTube media is required!');
      return;
    }
    const normalizedMedia = Array.isArray(postState.media)
      ? postState.media.map(m => ({ ...m, type: m.type?.toUpperCase() }))
      : [];
    const postData = {
      title: postState.title && postState.title.trim() ? postState.title : 'New Post',
      content: postState.content,
      status: postState.status,
      tags: postState.selectedTags,
      media: normalizedMedia,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (onSave) onSave(postData);
  };

 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{post && post.id ? 'Edit Post' : 'Create New Post'}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={postState.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post title..."
              />
            </div>
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
                  {postState.selectedTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {postState.selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                            className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                            title={`Remove ${tag} tag`}
                            style={{ display: 'inline-flex', alignItems: 'center' }}
                          >
                            <X className="h-3 w-3" />
                          </span>
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
                      {loadingTags ? (
                        <div className="text-gray-400 text-sm">Loading tags...</div>
                      ) : tags.length === 0 ? (
                        <div className="text-gray-400 text-sm">No tags found</div>
                      ) : tags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagToggle(tag.name)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                            postState.selectedTags.includes(tag.name) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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
              {isClient && (
                <>
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-t-md border-b-2 text-sm font-medium focus:outline-none transition-all duration-150 ${mediaType === 'image' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => {
                        setMediaType('image');
                        handleRemoveMedia();
                      }}
                    >
                      Image
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-t-md border-b-2 text-sm font-medium focus:outline-none transition-all duration-150 ${mediaType === 'youtube' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => {
                        setMediaType('youtube');
                        handleRemoveMedia();
                      }}
                    >
                      YouTube video
                    </button>
                  </div>
                  <MediaInput
                    onMediaAdd={handleMediaAdd}
                    onMediaRemove={handleRemoveMedia}
                    mediaType={mediaType}
                  />
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={postState.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED')}
                title="Select post status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <TipTapEditor
                content={postState.content}
                onChange={(content: string) => handleInputChange('content', content)}
                placeholder="Start writing your post... You can paste HTML content from any website and it will be automatically converted to proper format!"
              />
            </div>
            <div className="flex justify-end gap-2">
              {post && post.id ? (
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Post
                </button>
              )}
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
          {Array.isArray(postState.media) && postState.media.length > 0 && (
            <div className="mb-6">
              <div className="space-y-4">
                {postState.media.map((media, index) => (
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
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {postState.content ? (
            <TipTapPreview content={postState.content} />
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