import { NextResponse } from 'next/server';

export async function GET() {
  const mockTime = new Date();
  return NextResponse.json({ data: mockTime } );
}