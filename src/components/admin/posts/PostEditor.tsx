import { useState, useEffect, useRef } from 'react';
import { Save, Eye, EyeOff, Tag, User, X } from 'lucide-react';
import { mockTags } from '~/constants/tags';

interface PostEditorProps {
  onSave: (post: any) => void;
}

export function PostEditor({ onSave }: PostEditorProps) {
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    selectedTags: [] as string[],
    author: 'Admin User',
    status: 'draft' as 'draft' | 'published',
  });

  const [showPreview, setShowPreview] = useState(false);
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

  const handleSave = () => {
    const postData = {
      ...post,
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

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Post Editor</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post title..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post excerpt..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left flex items-center justify-between"
                >
                  <span className={post.selectedTags.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                    {post.selectedTags.length > 0 
                      ? `${post.selectedTags.length} tag(s) selected` 
                      : 'Select tags...'
                    }
                  </span>
                  <Tag className="h-4 w-4 text-gray-400" />
                </button>

                {/* Selected Tags */}
                {post.selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-blue-600"
                          title={`Remove ${tag} tag`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Tag Dropdown */}
                {showTagDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {mockTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagToggle(tag.name)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                          post.selectedTags.includes(tag.name) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span>{tag.name}</span>
                        {post.selectedTags.includes(tag.name) && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                Content (Markdown)
              </label>
              <textarea
                value={post.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="# Your post content here...

## Use markdown formatting

- Bullet points
- **Bold text**
- *Italic text*

### Code blocks
```javascript
console.log('Hello Cardano!');
```"
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
            {post.author}
          </div>
        </div>

        <div className="prose max-w-none">
          {post.title && (
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
          )}
          
          {post.excerpt && (
            <p className="text-gray-600 mb-4 italic">{post.excerpt}</p>
          )}

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

          {post.content && (
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          )}

          {!post.title && !post.content && (
            <div className="text-center text-gray-500 py-8">
              <p>Start writing to see the preview...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 