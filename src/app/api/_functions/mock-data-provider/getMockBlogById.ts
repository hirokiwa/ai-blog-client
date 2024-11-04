import { getMockBlogs } from "./getMockBlogs";

export const getMockBlogById = (blogId: string) => {
  const allBlogs = getMockBlogs();
  const blog = allBlogs.find((a) => a.id === blogId);
  return blog;
};
