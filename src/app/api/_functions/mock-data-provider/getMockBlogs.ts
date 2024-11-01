import mockBlogsJson from "./mockBlogs.json";

export const repeatBlogs = ({
  blogs,
  limit,
}: {
  blogs: blog[];
  limit: number;
}) =>
  Array.from({ length: Math.ceil(limit / blogs.length) })
    .flatMap(() => blogs)
    .slice(0, limit)
    .map((blog, index) => ({
      ...blog,
      id: (index + 1).toString(),
    }));

export const getMockBlogs = (limit?: number) => {
  if (limit === 0) return [];

  const mockData: { blogs: { title: string; body: string }[] } = mockBlogsJson;
  const currentTime = new Date();

  const blogs = mockData.blogs.map((b, index) => ({
    ...b,
    id: (index + 1).toString(),
    publishedAt: currentTime,
  })) as blog[];

  return limit
    ? repeatBlogs({ blogs: blogs, limit: limit })
    : blogs;
};

export const getMockBlogById = (blogId: string) => {
  const allBlogs = getMockBlogs();
  const blog = allBlogs.find(a => a.id === blogId);
  return blog;
};
