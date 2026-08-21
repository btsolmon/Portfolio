import { GoogleGenAI } from "@google/genai";

import { buildSystemPrompt } from "@/lib/persona";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 16;
const MAX_CHARS = 2000;
const MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-2.0-flash",
].filter((model, index, list): model is string => Boolean(model) && list.indexOf(model) === index);

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

function chunkText(chunk: { text?: string }) {
  try {
    return chunk.text ?? "";
  } catch {
    return "";
  }
}

function geminiMessage(error: unknown) {
  const message =
    error && typeof error === "object" && "message" in error
      ? String((error as { message: unknown }).message)
      : "";

  const lower = message.toLowerCase();
  if (lower.includes("api key") || lower.includes("permission") || lower.includes("unauthenticated")) {
    return "The Gemini API key is invalid. Check GEMINI_API_KEY in Vercel Environment Variables.";
  }
  if (lower.includes("quota") || lower.includes("resource exhausted")) {
    return "Gemini quota is used up for now. Try again later.";
  }
  return "I couldn't reply just now. Please try again.";
}

async function startStream(ai: GoogleGenAI, contents: ReturnType<typeof toGeminiContents>) {
  let lastError: unknown;

  for (const model of MODELS) {
    for (const thinking of [undefined, { thinkingBudget: 0 }]) {
      try {
        return await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction: buildSystemPrompt(),
            temperature: 0.7,
            maxOutputTokens: 2048,
            ...(thinking ? { thinkingConfig: thinking } : {}),
          },
        });
      } catch (error) {
        lastError = error;
        console.error(`Gemini failed (${model}, thinking=${Boolean(thinking)}):`, error);
      }
    }
  }

  throw lastError;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
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

  const ai = new GoogleGenAI({ apiKey });

  try {
    const stream = await startStream(ai, toGeminiContents(history));
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunkText(chunk);
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
    return Response.json({ error: geminiMessage(error) }, { status: 502 });
  }
}
