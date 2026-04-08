"use server";

import { BLOGS_PER_PAGE } from "./pagination";

interface PostsPageResponse {
  data?: {
    blogs: RawPostBlog[];
    currentPage: number;
    pageSize: number;
    totalBlogs: number;
    totalPages: number;
  };
}

interface RawPostBlog {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
}

export interface PostsPageData {
  blogs: blog[];
  currentPage: number;
  pageSize: number;
  totalBlogs: number;
  totalPages: number;
}

const formatBlog = (rawBlog: RawPostBlog): blog => {
  const timeDifference = 9;
  const publishedAt = new Date(
    new Date(rawBlog.publishedAt).getTime() + timeDifference * 60 * 60 * 1000
  );

  return {
    id: rawBlog.id,
    title: rawBlog.title,
    body: rawBlog.body,
    publishedAt,
  };
};

const getPostsPage = async (page: number): Promise<PostsPageData | null> => {
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/api/posts?page=${page}&pageSize=${BLOGS_PER_PAGE}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Faild to get posts page. status: ${response.status}`);
    }

    const result = (await response.json()) as PostsPageResponse;

    if (!result.data) {
      return null;
    }

    return {
      blogs: result.data.blogs.map((blog) => formatBlog(blog)),
      currentPage: result.data.currentPage,
      pageSize: result.data.pageSize,
      totalBlogs: result.data.totalBlogs,
      totalPages: result.data.totalPages,
    };
  } catch (e) {
    console.error(e, "Faild to get posts page.");
    return null;
  }
};

export default getPostsPage;
