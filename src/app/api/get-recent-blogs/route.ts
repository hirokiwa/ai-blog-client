import { NextResponse } from 'next/server';
import { getMockBlogs } from '../_functions/mock-data-provider/getMockBlogs';
import { getPublishedBlogs } from '../_functions/blogs/blogs';

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
  const data = useMockData
    ? getMockBlogs(RECENT_BLOG_QUANTITY)
    : await getPublishedBlogs(RECENT_BLOG_QUANTITY);
  return NextResponse.json({ data: data }, { headers: createCorsHeaders(request.headers.get("origin")) } );
}

export function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: createCorsHeaders(request.headers.get("origin")),
  });
}
