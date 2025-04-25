"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { userProfile } from "@/lib/data"
import type { Message } from "@/lib/data"

interface MessageListProps {
  initialMessages: Message[]
}

export default function MessageList({ initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `M${Date.now()}`,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
      avatar: userProfile.avatar,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: `M${Date.now() + 1}`,
        sender: "support",
        content: "Thank you for your message. Our team will get back to you shortly.",
        timestamp: new Date().toISOString(),
        read: false,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="flex h-[600px] flex-col rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Customer Support</h2>
        <p className="text-sm text-muted-foreground">We typically reply within an hour</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      message.avatar ||
                      (message.sender === "user"
                        ? userProfile.avatar
                        : "https://randomuser.me/api/portraits/women/68.jpg")
                    }
                    alt={message.sender}
                  />
                  <AvatarFallback>{message.sender === "user" ? "U" : "CS"}</AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{format(new Date(message.timestamp), "h:mm a")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
