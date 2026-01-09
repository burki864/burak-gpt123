"use client"

import Image from "next/image"
import { Code, Lightbulb, FileText, Zap } from "lucide-react"

interface WelcomeScreenProps {
  onSuggestionClick: (content: string) => void
}

const suggestions = [
  {
    icon: Code,
    title: "Kod Yaz",
    prompt: "TypeScript kullanarak bir React component yazmama yardım et",
  },
  {
    icon: Lightbulb,
    title: "Fikir Üret",
    prompt: "Projem için yaratıcı fikirler bulmama yardım et",
  },
  {
    icon: FileText,
    title: "Özetle",
    prompt: "Uzun bir metni veya belgeyi benim için özetle",
  },
  {
    icon: Zap,
    title: "Açıkla",
    prompt: "Karmaşık bir konuyu basitçe açıkla",
  },
]

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 pb-32">
      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
          <Image
            src="/logo.png"
            alt="BurakGPT Logo"
            width={36}
            height={36}
            priority
          />
        </div>
      </div>

      {/* Başlık */}
      <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-balance">
        BurakGPT ile ne yapmak istiyorsun?
      </h1>

      <p className="mb-10 max-w-sm text-center text-sm text-muted-foreground text-balance">
        Bana istediğini sorabilir ya da aşağıdaki önerilerden birini seçebilirsin.
      </p>

      {/* Öneriler */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-2.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="group flex items-center gap-3 rounded-xl border border-border/40 bg-card/40 p-3.5 text-left transition-all hover:border-accent/40 hover:bg-card"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 transition-colors group-hover:bg-accent/15">
              <suggestion.icon className="size-4 text-muted-foreground transition-colors group-hover:text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground/90">
              {suggestion.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
