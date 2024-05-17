import BlogCard from "./BlogCard"

const BlogSection = () => {
  return (
    <div className="px-6 md:px-8 flex flex-col items-center lg:grid lg:grid-cols-3 gap-x-8 gap-y-12">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  )
}

export default BlogSection