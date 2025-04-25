"use client"

import { useAppContext } from "@/lib/context/app-context"
import NotificationList from "@/components/notification-list"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function NotificationsPage() {
  const { notifications, markAllNotificationsAsRead } = useAppContext()
  const { toast } = useToast()

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()
    toast({
      title: "Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  )
}
