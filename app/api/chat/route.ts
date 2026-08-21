import { GoogleGenAI } from "@google/genai";

import { buildSystemPrompt } from "@/lib/persona";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 16;
const MAX_CHARS = 2000;
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as ChatMessage;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_CHARS
  );
}

function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json(
      { error: "This chat isn't set up yet." },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return Response.json(
      {
        error:
          "Too many questions from this network. Please wait an hour and try again.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown }).messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isChatMessage)
  ) {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  const history = messages as ChatMessage[];
  if (history.at(-1)?.role !== "user") {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: toGeminiContents(history),
      config: {
        systemInstruction: buildSystemPrompt(),
        temperature: 0.7,
        maxOutputTokens: 800,
        thinkingConfig: { thinkingBudget: 0 },
        abortSignal: req.signal,
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("Gemini chat failed:", error);
    return Response.json(
      { error: "I couldn't reply just now. Please try again." },
      { status: 502 },
    );
  }
}
