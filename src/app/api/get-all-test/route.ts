import { createDataResponse } from '../_functions/api-response';

export async function GET() {
  const mockTime = new Date();
  return createDataResponse(mockTime);
}
