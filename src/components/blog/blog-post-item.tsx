"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BlogPost, sampleComment, mockComments, additionalCommentsTemplates } from "~/constants/blogs";
import { Heart, MessageCircle, Send, Share2, User, ThumbsUp, Smile, Image as ImageIcon } from "lucide-react";
import BlogCommentSkeleton from "./blog-comment-skeleton";

interface BlogPostItemProps {
  post: BlogPost;
}

export default function BlogPostItem({ post }: BlogPostItemProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [loadedComments, setLoadedComments] = useState<typeof mockComments>([]);
  const [displayedComments, setDisplayedComments] = useState<typeof mockComments>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const commentsPerPage = 5;

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log("New comment:", commentText);
      setCommentText("");
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const loadComments = async () => {
    setIsLoadingComments(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadedComments(mockComments);
    setDisplayedComments(mockComments.slice(0, commentsPerPage));
    setIsLoadingComments(false);
  };

  const loadMoreComments = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    if (endIndex > loadedComments.length) {
      const additionalComments = additionalCommentsTemplates.map((template, index) => ({
        id: `new-${Date.now()}-${index + 1}`,
        author: template.author,
        authorAvatar: template.authorAvatar,
        content: template.content,
        timestamp: template.timestamp,
        likes: template.likes,
      }));
      
      setLoadedComments(prev => [...prev, ...additionalComments]);
    }
    
    const newDisplayedComments = loadedComments.slice(0, endIndex);
    setDisplayedComments(newDisplayedComments);
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };
  useEffect(() => {
    if (showComments && loadedComments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const isLongContent = post.excerpt.length > 150;
  const displayContent = showFullContent ? post.excerpt : post.excerpt.slice(0, 150) + (isLongContent ? '...' : '');
  const hasMoreComments = displayedComments.length < loadedComments.length || currentPage * commentsPerPage < loadedComments.length;

  return (
    <div className="bg-gray-800/50 border border-white/20 rounded-lg lg:rounded-xl p-4 lg:p-6 shadow-sm backdrop-blur-sm mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm">{post.author}</h3>
          <p className="text-xs text-gray-400">{post.authorLocation} • {post.date}</p>
        </div>
        <button className="text-gray-400 hover:text-white p-1" aria-label="Post options">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <div className="mb-3">
          <p className="text-sm text-gray-300 whitespace-pre-wrap">
            {displayContent}
            {isLongContent && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-blue-400 hover:underline ml-1"
              >
                {showFullContent ? 'See less' : 'See more'}
              </button>
            )}
          </p>
        </div>
        <div className="mb-3">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={300}
            className="w-full h-48 lg:h-64 object-cover object-top rounded-lg"
          />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between py-3 border-b border-white/10 mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <ThumbsUp className="w-3 h-3 text-white" />
            </div>
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
          </div>
          <span className="text-xs text-gray-400">{formatNumber(likesCount)}</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <span>{formatNumber(post.comments)} comments</span>
          <span>{formatNumber(post.shares)} shares</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-2 border-b border-white/10 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            liked ? 'text-red-400 bg-red-500/20' : 'text-gray-400 hover:bg-gray-700/50'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm">Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Comment</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:bg-gray-700/50 rounded-lg transition-colors">
          <Send className="w-5 h-5" />
          <span className="text-sm">Send</span>
        </button>
      </div>

      {!showComments && (
        <button 
          onClick={() => setShowComments(true)}
          className="text-blue-400 text-sm hover:underline mb-4"
        >
          View all {post.comments} comments
        </button>
      )}

      {showComments && (
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1">
              <form onSubmit={handleCommentSubmit} className="relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-400 p-1"
                    aria-label="Add emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-400 p-1"
                    aria-label="Add photo"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {isLoadingComments && (
            <div className="space-y-3">
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
            </div>
          )}
          {!isLoadingComments && displayedComments.length > 0 && (
            <>
              {displayedComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Like</span>
                        </button>
                        <button className="text-xs text-gray-400 hover:text-blue-400">Reply</button>
                        <button className="text-xs text-gray-400 hover:text-blue-400">{comment.timestamp}</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {!isLoadingComments && hasMoreComments && (
            <button 
              onClick={loadMoreComments}
              disabled={isLoadingMore}
              className="text-blue-400 text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : `Load more comments (${displayedComments.length}/${loadedComments.length})`}
            </button>
          )}
          {isLoadingMore && (
            <div className="space-y-3">
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
              <BlogCommentSkeleton />
            </div>
          )}

          <button 
            onClick={() => setShowComments(false)}
            className="text-blue-400 text-sm hover:underline"
          >
            Hide comments
          </button>
        </div>
      )}
    </div>
  );
} 