"use client";

import { useState, useEffect } from "react";
import { blogs } from "~/constants/blogs";
import BlogPostItem from "./blog-post-item";
import BlogPostSkeleton from "./blog-post-skeleton";

export default function BlogContent() {
  const [displayedPosts, setDisplayedPosts] = useState(blogs.slice(0, 3));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Simulate loading more posts
  const loadMorePosts = async () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    const newPosts = blogs.slice(startIndex, endIndex);
    if (newPosts.length > 0) {
      setDisplayedPosts(prev => [...prev, ...newPosts]);
      setCurrentPage(nextPage);
    }
    
    setIsLoadingMore(false);
  };

  // Handle scroll to load more
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore && displayedPosts.length < blogs.length) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, displayedPosts.length]);

  const hasMorePosts = displayedPosts.length < blogs.length;

  return (
    <div className="flex-1 bg-transparent">
      <div className="p-3 lg:p-6 space-y-4 lg:space-y-6">
        {/* Displayed Posts */}
        {displayedPosts.map((post) => (
          <BlogPostItem key={post.id} post={post} />
        ))}

        {/* Loading More Skeleton */}
        {isLoadingMore && (
          <>
            <BlogPostSkeleton />
            <BlogPostSkeleton />
            <BlogPostSkeleton />
          </>
        )}

        {/* End of posts indicator */}
        {!isLoadingMore && !hasMorePosts && displayedPosts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">You've reached the end of all posts</p>
          </div>
        )}
      </div>
    </div>
  );
} 