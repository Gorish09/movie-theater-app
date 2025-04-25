"use client"

import { format } from "date-fns"
import { Bell, Calendar, Tag, Check } from "lucide-react"
import type { Notification } from "@/lib/data"
import { useAppContext } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"

interface NotificationListProps {
  notifications: Notification[]
}

export default function NotificationList({ notifications }: NotificationListProps) {
  const { markNotificationAsRead } = useAppContext()

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "offer":
        return <Tag className="h-5 w-5 text-green-500" />
      case "movie":
        return <Bell className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 rounded-lg border p-4 transition-colors ${notification.read ? "" : "bg-muted/50"}`}
          >
            <div className="mt-1 flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-medium">{notification.title}</h3>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">{format(new Date(notification.timestamp), "PPp")}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No Notifications</h3>
          <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
        </div>
      )}
    </div>
  )
}
