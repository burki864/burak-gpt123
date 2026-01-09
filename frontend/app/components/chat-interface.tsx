"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  source?: "local-qwen" | "openai"
  image?: string
}

export function ChatInference() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.content }),
        }
      )

      const data = await res.json()

      const botMessage: Message = {
        role: "assistant",
        content: data.reply,
        source: data.source,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Backend bağlantı hatası",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  async function generateImage() {
    if (!input.trim()) return

    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        }
      )

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Görsel üretildi",
          image: `${process.env.NEXT_PUBLIC_API_URL}/${data.file}`,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Görsel üretilemedi",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl ${
              m.role === "user"
                ? "ml-auto text-right"
                : "mr-auto text-left"
            }`}
          >
            <div className="rounded-xl bg-zinc-900 p-3">
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>

              {m.source && (
                <span className="block text-xs text-zinc-400 mt-1">
                  {m.source === "local-qwen"
                    ? "Local Qwen"
                    : "OpenAI"}
                </span>
              )}

              {m.image && (
                <img
                  src={m.image}
                  alt="generated"
                  className="mt-3 rounded-lg"
                />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-zinc-500">
            BurakGPT düşünüyor…
          </p>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Bir şey yaz..."
          className="flex-1 bg-zinc-900 rounded-lg px-3 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Gönder
        </button>

        <button
          onClick={generateImage}
          className="px-4 py-2 bg-zinc-800 rounded-lg"
        >
          🎨
        </button>
      </div>
    </div>
  )
}
