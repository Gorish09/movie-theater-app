import { messages } from "@/lib/data"
import MessageList from "@/components/message-list"

export default function MessagesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Messages</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MessageList initialMessages={messages} />
        </div>

        <div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Support Information</h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-medium">Operating Hours:</span> Our customer support team is available from 9 AM
                to 10 PM, seven days a week.
              </p>
              <p>
                <span className="font-medium">Response Time:</span> We typically respond to messages within 1 hour
                during operating hours.
              </p>
              <p>
                <span className="font-medium">Emergency Contact:</span> For urgent matters, please call our hotline at
                (555) 123-4567.
              </p>
              <p>
                <span className="font-medium">Email Support:</span> You can also reach us at support@movietheater.com
                for non-urgent inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
