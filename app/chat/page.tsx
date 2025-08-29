"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-[var(--font-poppins)] text-3xl mb-4">Chat</h1>
        <Card className="rounded-2xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-muted">
            <div className="max-w-[70%] rounded-2xl bg-primary/10 p-3">Hello! Is the meal still available?</div>
            <div className="max-w-[70%] rounded-2xl bg-accent/30 p-3 ml-auto">Yes, pickup before 7 PM works best.</div>
            <div className="max-w-[70%] rounded-2xl bg-primary/10 p-3">Great, I’ll be there at 6:30.</div>
          </div>
          <form className="p-3 border-t flex items-center gap-2">
            <Input placeholder="Type your message..." className="rounded-2xl" aria-label="Message input" />
            <Button type="submit" className="rounded-2xl">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}
