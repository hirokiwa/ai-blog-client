import {
  Timestamp,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { initializeBlogCollection } from "../firestore/firestore";

export interface PaginatedBlogsResult {
  blogs: blog[];
  currentPage: number;
  pageSize: number;
  totalBlogs: number;
  totalPages: number;
}

const BLOG_PREVIEW_BODY_LENGTH = 50;

const getPublishedDate = () => {
  const timeDifference = Number(process.env.TIME_DIFFERENCE ?? "0");
  return new Date(Date.now() + timeDifference * 60 * 60 * 1000);
};

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.");
    throw e;
  }
};

const formatBlog = (rawBlog: any): blog => ({
  id: rawBlog.id,
  title: rawBlog.title,
  body: String(rawBlog.body ?? "").slice(0, BLOG_PREVIEW_BODY_LENGTH),
  publishedAt: timeStampToDate(rawBlog.publishedAt),
});

const isPublicBlog = (rawBlog: any) => rawBlog.publiclyAvailable === true;

const createPublishedBlogsQuery = () => {
  const blogCollection = initializeBlogCollection();
  return query(
    blogCollection,
    where("publishedAt", "<=", getPublishedDate()),
    orderBy("publishedAt", "desc")
  );
};

const fetchPublishedBlogDocs = async (fetchLimit?: number) => {
  const blogQuery = fetchLimit
    ? query(createPublishedBlogsQuery(), limit(fetchLimit))
    : createPublishedBlogsQuery();
  const blogSnapshot = await getDocs(blogQuery);
  return blogSnapshot.docs;
};

export const getPublishedBlogs = async (fetchLimit?: number): Promise<blog[] | undefined> => {
  try {
    const blogDocs = await fetchPublishedBlogDocs(fetchLimit);
    const blogs = blogDocs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((blog) => isPublicBlog(blog))
      .map((blog) => formatBlog(blog));
    return blogs.length > 0 ? blogs : undefined;
  } catch (e) {
    console.error("Faild to get blogs.", e);
    return undefined;
  }
};

export const getPublishedBlogsPage = async (
  page: number,
  pageSize: number
): Promise<PaginatedBlogsResult> => {
  try {
    const blogDocs = await fetchPublishedBlogDocs();
    const allBlogs = blogDocs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((blog) => isPublicBlog(blog))
      .map((blog) => formatBlog(blog));
    const totalBlogs = allBlogs.length;
    const totalPages = Math.max(1, Math.ceil(totalBlogs / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const blogs = allBlogs.slice(startIndex, startIndex + pageSize);

    return {
      blogs,
      currentPage,
      pageSize,
      totalBlogs,
      totalPages,
    };
  } catch (e) {
    console.error("Faild to get paginated blogs.", e);
    return {
      blogs: [],
      currentPage: 1,
      pageSize,
      totalBlogs: 0,
      totalPages: 1,
    };
  }
};
