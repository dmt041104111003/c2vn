'use client';

import Blog from "~/components/blog";
import Title from "~/components/title";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/admin/posts?public=1")
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data.posts) ? data.posts : []));
  }, []);

  return (
    <main className="relative pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Title
          title="Cardano2vn Blog"
          description="Insights, updates, and stories from the Andamio ecosystem. Explore our journey building trust protocols for distributed work."
        />
        <section className="grid gap-8 lg:grid-cols-2">
          {posts.filter(post => post.status === 'PUBLISHED').map((post) => (
            <Blog
              key={post.id}
              image={Array.isArray(post.media) && post.media.length > 0 ? (post.media.find((m: any) => m.type === 'YOUTUBE') || post.media[0]) : undefined}
              action={post.status}
              title={post.title}
              author={post.author || "Admin"}
              slug={post.slug || post.id}
              datetime={new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ))}
        </section>
      </div>
    </main>
  );
}