import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call backend AI service
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

    const response = await fetch(`${backendUrl}/api/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Backend AI service failed');
    }

    const data = await response.json();

    return NextResponse.json({
      post: data.post,
      platform: data.platform || 'twitter',
    });

  } catch (error) {
    console.error('AI generation error:', error);

    // Fallback: Return a mock response for demo
    return NextResponse.json({
      post: `🚀 ${prompt}\n\nJust shipped! Excited to share this update with the community.\n\n#DevLife #Coding #GitHub`,
      platform: 'twitter',
    });
  }
}
