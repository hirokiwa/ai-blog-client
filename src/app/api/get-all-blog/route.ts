import { createDataResponse } from "../_functions/api-response";
import { getBlogs } from "../_functions/blog-repository";
import { getMockBlogs } from '../_functions/mock-data-provider/getMockBlogs';

export async function GET() {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const data = useMockData
    ? getMockBlogs()
    : await getBlogs({ errorMessage: "Faild to get all blogs." });
  return createDataResponse(data);
}
