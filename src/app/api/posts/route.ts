import { NextRequest, NextResponse } from "next/server";

import { getMockBlogs } from "../_functions/mock-data-provider/getMockBlogs";
import {
  getPublishedBlogsPage,
  type PaginatedBlogsResult,
} from "../_functions/blogs/blogs";
import { createDailyResetCacheHeaders } from "../_functions/cache/cacheHeaders";

const DEFAULT_PAGE_SIZE = 10;

const normalizePositiveInteger = (value: string | null, fallback: number) => {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const getMockBlogsPage = (page: number, pageSize: number): PaginatedBlogsResult => {
  const allBlogs = getMockBlogs();
  const totalBlogs = allBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalBlogs / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    blogs: allBlogs.slice(startIndex, startIndex + pageSize),
    currentPage,
    pageSize,
    totalBlogs,
    totalPages,
  };
};

export async function GET(request: NextRequest) {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const page = normalizePositiveInteger(request.nextUrl.searchParams.get("page"), 1);
  const pageSize = normalizePositiveInteger(
    request.nextUrl.searchParams.get("pageSize"),
    DEFAULT_PAGE_SIZE
  );

  const data = useMockData
    ? getMockBlogsPage(page, pageSize)
    : await getPublishedBlogsPage(page, pageSize);

  return NextResponse.json({ data }, { headers: createDailyResetCacheHeaders() });
}
