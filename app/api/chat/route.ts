import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are DevSync AI Assistant, a helpful and knowledgeable chatbot for DevSync — a platform that automatically transforms GitHub commits into engaging social media content for LinkedIn, X (Twitter), and Instagram.

Key facts about DevSync:
- Automatically generates social media posts from GitHub commits via AI
- Supports posting to LinkedIn, X/Twitter, and Instagram simultaneously
- Privacy-first: only reads commit metadata (messages, branch names, PR descriptions), never source code
- Real-time analytics for engagement, reach, and growth tracking
- Smart content history — save, reuse, and A/B test posts
- GitHub native integration with OAuth and webhook setup in under 2 minutes
- Content generation takes less than 3 seconds
- Pricing includes free tier for individual developers

Your personality:
- Friendly, concise, and developer-friendly
- Use simple language, avoid jargon unless the user is technical
- Keep responses short (2-4 sentences unless more detail is requested)
- If asked something unrelated to DevSync, briefly answer and steer back to how DevSync can help
- Never make up features that don't exist`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chatHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'You are: ' + SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I am DevSync AI Assistant, ready to help users learn about DevSync and how it can transform their GitHub activity into engaging social media content. How can I help?' }] },
        ...chatHistory.slice(0, -1),
      ],
    });

    const lastMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
