import { NextResponse } from 'next/server';

import { getMockBlogs } from '../_functions/mock-data-provider/getMockBlogs';
import { getPublishedBlogs } from '../_functions/blogs/blogs';

export async function GET() {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const data = useMockData ? getMockBlogs() : await getPublishedBlogs();
  return NextResponse.json({ data: data ?? undefined } );
}
