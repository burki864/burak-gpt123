"use client"

import { cn } from "@/lib/utils"
import { User, Sparkles, Copy, Check, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import type { Message } from "./chat-interface"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = async () => {
    if (!message.content) return
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser && "flex-row-reverse",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-accent text-accent-foreground" : "bg-secondary",
        )}
      >
        {isUser ? (
          <User className="size-4" />
        ) : (
          <Sparkles className="size-4 text-accent" />
        )}
      </div>

      <div className={cn("flex-1 space-y-2", isUser && "flex justify-end")}>
        <div
          className={cn(
            "relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-accent text-accent-foreground"
              : "bg-card text-card-foreground",
          )}
        >
          {/* TEXT */}
          {message.content && (
            <>
              {isUser ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "")
                      const isInline = !match
                      return isInline ? (
                        <code
                          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-accent"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className={cn(
                            "block overflow-x-auto rounded-lg bg-[#0d0d0d] p-4 font-mono text-xs",
                            className,
                          )}
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    },
                    pre: ({ children }) => (
                      <pre className="my-3 overflow-hidden rounded-lg border border-border/50">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-3 list-disc space-y-1 pl-4 last:mb-0">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-3 list-decimal space-y-1 pl-4 last:mb-0">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="pl-1">{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-accent underline underline-offset-2 hover:text-accent/80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </>
          )}

          {/* IMAGE */}
          {message.image && (
            <div className="mt-3 overflow-hidden rounded-xl border border-border/50">
              <img
                src={message.image}
                alt="generated"
                className="w-full object-cover"
              />
            </div>
          )}

          {/* SOURCE TAG */}
          {!isUser && message.source && (
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              {message.image ? (
                <>
                  <ImageIcon className="size-3.5" />
                  Görsel • {message.source}
                </>
              ) : (
                <>Yanıt • {message.source}</>
              )}
            </div>
          )}

          {/* COPY BUTTON */}
          {!isUser && message.content && (
            <button
              onClick={handleCopy}
              className="absolute -bottom-8 left-0 flex items-center gap-1.5 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
