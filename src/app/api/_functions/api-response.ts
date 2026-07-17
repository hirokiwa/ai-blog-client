import { NextResponse } from "next/server";

export const createDataResponse = <T>(
  data: T | null | undefined,
  init?: ResponseInit
) => NextResponse.json({ data: data ?? undefined }, init);
