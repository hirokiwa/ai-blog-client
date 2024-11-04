import { NextRequest, NextResponse } from 'next/server';

import { Timestamp, getDoc } from "firebase/firestore";
import { getMockBlogById } from '../../_functions/mock-data-provider/getMockBlogById';
import { initializeDoc } from '../../_functions/firestore/firestore';

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

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
