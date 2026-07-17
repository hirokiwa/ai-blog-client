import { NextRequest } from 'next/server';

import { createDataResponse } from '../../_functions/api-response';
import { getBlogById } from '../../_functions/blog-repository';
import { getMockBlogById } from '../../_functions/mock-data-provider/getMockBlogById';

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {

  const blogId = params.blogId;
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  const data = useMockData
    ? getMockBlogById(blogId)
    : await getBlogById(blogId, "Faild to get blog.");
  return createDataResponse(data);
}
