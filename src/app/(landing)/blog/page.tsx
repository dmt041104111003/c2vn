import Blog from "~/components/blog";
import Title from "~/components/title";
import { blogs } from "~/constants/blogs";

export default function BlogsPage() {
  return (
    <main className="relative pt-20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {/* Title */}
        <Title
          title="Cardano2vn Blog"
          description="Insights, updates, and stories from the Andamio ecosystem. Explore our journey building trust protocols for distributed work."
        />
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