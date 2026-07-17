import { NextResponse } from 'next/server';
import { createDataResponse } from '../_functions/api-response';
import { getBlogs } from '../_functions/blog-repository';
import { getMockBlogs } from '../_functions/mock-data-provider/getMockBlogs';

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
    : await getBlogs({
        limit: RECENT_BLOG_QUANTITY,
        errorMessage: "Faild to get recent blogs.",
      });
  return createDataResponse(data, {
    headers: createCorsHeaders(request.headers.get("origin")),
  });
}

export function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: createCorsHeaders(request.headers.get("origin")),
  });
}
