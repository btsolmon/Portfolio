"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { ChatMessage } from "@/types/chat";
import { useLanguage } from "@/lib/language/LanguageProvider";

type ChatPanelProps = {
  open: boolean;
  messages: ChatMessage[];
  loading: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  onReset: () => void;
};

function MessageText({ text }: { text: string }) {
  const parts = text
    .split(/(https?:\/\/[^\s]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi)
    .filter(Boolean);

  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith("http")) {
          return (
            <a
              key={`${part}-${index}`}
              href={part}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2"
            >
              {part}
            </a>
          );
        }
        if (part.includes("@") && !part.includes(" ")) {
          return (
            <a
              key={`${part}-${index}`}
              href={`mailto:${part}`}
              className="text-primary underline underline-offset-2"
            >
              {part}
            </a>
          );
        }
        return <span key={`${index}-${part.slice(0, 8)}`}>{part}</span>;
      })}
    </p>
  );
}

export default function ChatPanel({
  open,
  messages,
  loading,
  onSend,
  onClose,
  onReset,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const query = input.trim();
    if (!query || loading) return;
    setInput("");
    onSend(query);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <Image
                src="/hero.png?v=nogra"
                alt="Tsolmon"
                width={40}
                height={40}
                unoptimized
                className="size-10 rounded-full object-cover object-top"
              />
              <div>
                <p className="font-semibold leading-tight">Tsolmon</p>
                <p className="text-xs text-muted-foreground">
                  {t("chat.role")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onReset}
                aria-label={t("chat.newChat")}
                className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white/70 text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("chat.close")}
                className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white/70 text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pb-4">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain pr-1">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-10 flex justify-end"
                      : "mr-10 flex justify-start gap-2"
                  }
                >
                  {message.role === "assistant" ? (
                    <Image
                      src="/hero.png?v=nogra"
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className="mt-1 size-7 shrink-0 rounded-full object-cover object-top"
                    />
                  ) : null}
                  <div
                    className={
                      message.role === "user"
                        ? "rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-white"
                        : "rounded-2xl rounded-bl-md border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm text-neutral-800"
                    }
                  >
                    {message.role === "assistant" &&
                    !message.content &&
                    loading &&
                    index === messages.length - 1 ? (
                      <span className="inline-flex gap-1 py-1">
                        <span className="size-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.1s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-neutral-400" />
                      </span>
                    ) : (
                      <MessageText text={message.content} />
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={submit} className="mt-4">
              <div className="flex items-center rounded-full border border-neutral-200 bg-white/70 py-2.5 pr-2 pl-6 backdrop-blur-lg">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={t("chat.ask")}
                  disabled={loading}
                  className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label={t("chat.send")}
                  className="flex items-center justify-center rounded-full bg-primary p-2.5 text-white transition-colors hover:bg-[#015bb8] disabled:opacity-70"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
