import Blog from "~/components/blog";
import { blogs } from "~/databases/blogs";

export default function BlogsPage() {
  return (
    <main className="relative pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Title */}
        <section className="relative mb-16">
          <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent shadow-lg shadow-blue-500/50"></div>
          <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-white/60 to-transparent"></div>
          <div className="mb-6 flex items-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <h1 className="text-4xl font-bold text-white lg:text-6xl">Cardano2vn Blog</h1>
          </div>
          <p className="max-w-3xl text-xl text-gray-300">
            Insights, updates, and stories from the Andamio ecosystem. Explore our journey building trust protocols for distributed work.
          </p>
        </section>
        {/* Content */}
        <section className="grid gap-8 lg:grid-cols-2">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              image={blog.image}
              action={blog.action}
              title={blog.title}
              author={blog.author}
              datetime={new Date(blog.date).toLocaleDateString("en-US", {
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
