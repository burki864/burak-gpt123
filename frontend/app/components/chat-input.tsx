"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (content: string) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="sticky bottom-0 border-t border-border/30 bg-background/95 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[900px] p-4">
        <div className="relative flex items-end gap-3 rounded-2xl border border-border/50 bg-card/80 p-3 shadow-xl shadow-black/20 transition-all focus-within:border-accent/50 focus-within:shadow-accent/5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            rows={1}
            className="max-h-[200px] min-h-[28px] flex-1 resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none"
          />

          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className={cn(
              "size-8 shrink-0 rounded-lg transition-all duration-200",
              input.trim()
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-secondary text-muted-foreground",
            )}
          >
            <ArrowUp className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground/50">
          Nova can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  )
}
