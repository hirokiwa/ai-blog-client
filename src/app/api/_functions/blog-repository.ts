import {
  DocumentData,
  QueryConstraint,
  Timestamp,
  getDoc,
  getDocs,
  limit as queryLimit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { initializeBlogCollection, initializeDoc } from "./firestore/firestore";

const BODY_LENGTH_LIMIT_FOR_PREVIEW = 45;

type GetBlogsOptions = {
  limit?: number;
  errorMessage: string;
};

export const getBlogs = async ({
  limit,
  errorMessage,
}: GetBlogsOptions): Promise<blog[] | undefined> => {
  try {
    const blogCollection = initializeBlogCollection();
    const constraints: QueryConstraint[] = [
      where("publishedAt", "<=", getPublishedDateUpperBound()),
      orderBy("publishedAt", "desc"),
      ...(limit !== undefined ? [queryLimit(limit)] : []),
    ];

    const blogQuery = query(blogCollection, ...constraints);
    const blogSnapshot = await getDocs(blogQuery);
    const formattedData = blogSnapshot.docs
      .filter((doc) => doc.data().publiclyAvailable)
      .map((doc): blog => formatBlog(doc.id, doc.data()))
      .map((blog): blog => limitBodyLength(blog, BODY_LENGTH_LIMIT_FOR_PREVIEW));

    return formattedData.length > 0 ? formattedData : undefined;
  } catch (e) {
    console.error(errorMessage, e);
    return undefined;
  }
};

export const getBlogById = async (
  blogId: string,
  errorMessage: string
): Promise<blog | undefined> => {
  try {
    const blogDoc = initializeDoc(blogId);
    const blogSnapshot = await getDoc(blogDoc);

    if (!blogSnapshot.exists()) {
      return undefined;
    }

    return formatBlog(blogSnapshot.id, blogSnapshot.data());
  } catch (e) {
    console.error(errorMessage, e);
    return undefined;
  }
};

const getPublishedDateUpperBound = () => {
  const timeDifference = Number(process.env.TIME_DIFFERENCE ?? "0");
  const publishedDate = new Date();
  publishedDate.setHours(publishedDate.getHours() + timeDifference);
  return publishedDate;
};

const formatBlog = (id: string, data: DocumentData): blog => ({
  id,
  title: data.title,
  body: data.body,
  publishedAt: timeStampToDate(data.publishedAt),
});

const limitBodyLength = (blog: blog, maxLength: number): blog => {
  return blog.body.length <= maxLength
    ? blog
    : {
      ...blog,
      body: blog.body.slice(0, maxLength) + "...",
    };
};

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.");
    throw e;
  }
};
