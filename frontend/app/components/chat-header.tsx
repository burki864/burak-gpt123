"use client"

import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"

interface ChatHeaderProps {
  onNewChat: () => void
}

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/30 bg-background/95 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15">
          <Sparkles className="size-4 text-accent" />
        </div>
        <span className="text-base font-semibold tracking-tight">Nova</span>
      </div>

      <Button
        onClick={onNewChat}
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 rounded-lg px-3 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Plus className="size-3.5" />
        <span>New chat</span>
      </Button>
    </header>
  )
}
