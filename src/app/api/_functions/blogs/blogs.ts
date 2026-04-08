import {
  Timestamp,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
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

const createPublishedBlogsQuery = () => {
  const blogCollection = initializeBlogCollection();
  return query(
    blogCollection,
    where("publishedAt", "<=", getPublishedDate()),
    where("publiclyAvailable", "==", true),
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
    const blogs = blogDocs.map((doc) => formatBlog({ id: doc.id, ...doc.data() }));
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
    const baseQuery = createPublishedBlogsQuery();
    const totalBlogsSnapshot = await getCountFromServer(baseQuery);
    const totalBlogs = totalBlogsSnapshot.data().count;
    const totalPages = Math.max(1, Math.ceil(totalBlogs / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skipCount = (currentPage - 1) * pageSize;
    const cursorSnapshot = skipCount > 0
      ? await getDocs(query(baseQuery, limit(skipCount)))
      : null;
    const lastVisibleDoc = cursorSnapshot?.docs[cursorSnapshot.docs.length - 1];
    const pageQuery = lastVisibleDoc
      ? query(baseQuery, startAfter(lastVisibleDoc), limit(pageSize))
      : query(baseQuery, limit(pageSize));

    const pageSnapshot = await getDocs(pageQuery);
    const blogs = pageSnapshot.docs.map((doc) => formatBlog({ id: doc.id, ...doc.data() }));

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
