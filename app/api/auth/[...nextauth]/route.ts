import { handlers } from "@/auth";
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    console.log('Auth callback received');
    const response = await handlers.GET(req);
    console.log('Auth response status:', response.status);
    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};

export { handlers as POST };
