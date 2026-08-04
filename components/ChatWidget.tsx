"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi, I'm Pyng! 🐧 Ask me anything about how PYNGYN plans and runs your projects.",
};

export function ChatWidget() {
  const pathname = usePathname();
  const isLP = pathname?.startsWith("/lp") ?? false;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Focus the input when the panel opens; close on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      // Ignore clicks inside the panel or on the launcher itself
      // (the launcher already toggles the panel via its own onClick).
      if (panelRef.current?.contains(target)) return;
      if (launcherRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      // Use the trailing slash to match `trailingSlash: true` in next.config.js
      // and avoid a POST→308 redirect that some hosts/browsers drop the body on.
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send only the conversation (the server prepends the system prompt).
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError("Pyng couldn't reach the server. Please try again.");
      // Keep the user's message visible so they can retry.
      setMessages(next);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (isLP) return null;

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Pyng"}
        className="fixed bottom-5 right-5 z-[90] grid h-16 w-16 place-items-center rounded-full border border-line bg-white shadow-art transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <Image
          src="/mascot-avatar.webp"
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 rounded-full object-cover"
          priority
        />
        <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-[#28c840]" aria-hidden="true" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat with Pyng"
            // max-h leaves room for the 68px fixed navbar + its CTA buttons
            // (Sign in / Start free / Book a demo) so the panel never overlaps them.
            className="fixed bottom-24 right-5 z-[95] flex h-[560px] max-h-[calc(100dvh-10rem)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-art"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-[#0e1430] px-4 py-3.5 text-white">
              <Image
                src="/mascot-avatar.webp"
                alt="Pyng the penguin"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
              />
              <div className="leading-tight">
                <div className="font-display text-[16px] font-semibold">Pyng</div>
                <div className="flex items-center gap-1.5 text-[12px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                  Online · AI assistant
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span aria-hidden="true" className="text-lg leading-none">×</span>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fbfbfd] px-4 py-4">
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} />
              ))}
              {loading && <TypingBubble />}
              {error && (
                <p className="text-center text-[13px] text-[#b9281f]">{error}</p>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-line bg-white p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-line px-3 py-2 focus-within:border-accent">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask Pyng anything…"
                  className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-dk disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12l16-8-6 16-3-7-7-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-muted">Powered by Groq · Pyng can make mistakes</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: Msg) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-accent text-white"
            : "rounded-bl-md border border-line bg-white text-ink"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
