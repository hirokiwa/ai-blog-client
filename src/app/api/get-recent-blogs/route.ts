import { NextResponse } from 'next/server';
import { getDocs, Timestamp, query, where, orderBy, limit } from "firebase/firestore";
import { getMockBlogs } from '../_functions/mock-data-provider/getMockBlogs';
import { initializeBlogCollection } from '../_functions/firestore/firestore';

const RECENT_BLOG_QUANTITY = 5;

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean)
);


const createCorsHeaders = (origin?: string | null): Record<string, string> => {
  const allowOrigin =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
};


export async function GET(request: Request) {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const data = useMockData ? getMockBlogs(RECENT_BLOG_QUANTITY) : await getRecentBlogs();
  return NextResponse.json({ data: data }, { headers: createCorsHeaders(request.headers.get("origin")) } );
}

export function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: createCorsHeaders(request.headers.get("origin")),
  });
}

const getRecentBlogs = async (): Promise<blog[]|undefined> => {
  try {
    const blogCollection = initializeBlogCollection();
    const TIME_DIFFERENCE = Number(process.env.TIME_DIFFERENCE ?? "0");
    const publishedDate = new Date();
    publishedDate.setHours(publishedDate.getHours() + TIME_DIFFERENCE);
    const blogQuery = query(blogCollection, where("publishedAt", "<=", publishedDate), orderBy("publishedAt", "desc"), limit(RECENT_BLOG_QUANTITY));
    const blogSnapshot = await getDocs(blogQuery);
    const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const formatedData = blogList
      .filter((b: any) => b.publiclyAvailable )
      .map((b: any): blog => ({
        id: b.id,
        title: b.title,
        body: b.body,
        publishedAt: timeStampToDate(b.publishedAt),
    }));
    return formatedData.length > 0 ? formatedData : undefined;
  } catch (e) {
    console.error("Faild to get recent blogs.", e);
    return undefined;
  }
}

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    console.log(timeStamp.toDate())
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
