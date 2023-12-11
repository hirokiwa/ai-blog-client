import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const id = "hello"
  return NextResponse.json(id);
}