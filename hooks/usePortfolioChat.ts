"use client";

import { useCallback, useRef, useState } from "react";

import type { ChatMessage } from "@/types/chat";

export function usePortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  const close = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
    setOpen(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setLoading(false);
    setOpen(false);
  }, []);

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const history: ChatMessage[] = [
      ...messagesRef.current.filter((message) => message.content.trim()),
      { role: "user" as const, content },
    ].slice(-16);

    setOpen(true);
    setLoading(true);
    setMessages([...history, { role: "assistant" as const, content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        const error =
          data?.error ?? "I couldn't reply just now. Please try again.";
        setMessages((prev) => {
          const next = [...prev];
          const last = next.at(-1);
          if (last?.role === "assistant") {
            next[next.length - 1] = { ...last, content: error };
          }
          return next;
        });
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let reply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        const snapshot = reply;
        setMessages((prev) => {
          const next = [...prev];
          const last = next.at(-1);
          if (last?.role === "assistant") {
            next[next.length - 1] = { ...last, content: snapshot };
          }
          return next;
        });
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error(error);
      setMessages((prev) => {
        const next = [...prev];
        const last = next.at(-1);
        if (last?.role === "assistant" && !last.content) {
          next[next.length - 1] = {
            ...last,
            content: "I couldn't reply just now. Please try again.",
          };
        }
        return next;
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  return { open, messages, loading, send, close, reset };
}
