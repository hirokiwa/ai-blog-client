import { NextRequest, NextResponse } from 'next/server';

import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, doc, getDoc } from "firebase/firestore";
import { getMockBlogById } from '../../_functions/mock-data-provider/getMockBlogs';

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {

  const blogId = params.blogId;
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  const data = useMockData ? getMockBlogById(blogId) : await getBlog(blogId);
  return NextResponse.json({ data: data ?? undefined } );
}

const getBlog = async (blogId: string): Promise<blog|undefined> => {
  try {
    const blogDoc = initializeDoc(blogId);
    const blogSnapshot = await getDoc(blogDoc);
    const responseData = {
      id: blogSnapshot.id,
      ...blogSnapshot.data(),
    } as any;
    const formatedData = responseData && {
      id: responseData.id,
      title: responseData.title,
      body: responseData.body,
      publishedAt: timeStampToDate(responseData.publishedAt),
    } as blog;
    return formatedData;
  } catch (e) {
    console.error("Faild to get all blogs.", e);
    return undefined;
  }
}

const initializeDb = () => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
  
    return db;
  } catch (e) {
    console.error("Faild to initialize app", e);
    return undefined;
  }
}

const initializeDoc = (blogId: string) => {
  try {
    const db = initializeDb();
    const collectionName = process.env.FIREBASE_BLOG_COLLECTION;
    if (!db || !collectionName) {
      throw new Error(!db
        ? "Faild to initialize app."
        : "Collection Name is not found."
      );
    }
    return doc(db, collectionName, blogId);
  } catch (e) {
    console.error("Faild to initialize blog collection.", e);
    throw e;
  }
}

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
