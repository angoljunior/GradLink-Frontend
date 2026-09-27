import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardInbox({ data, role }) {
  return <div className="mx-4 grid gap-4 lg:mx-6 md:grid-cols-2">
    <Card><CardHeader><CardTitle>Notifications ({data.unread_notifications} unread)</CardTitle></CardHeader><CardContent>
      {data.notifications.length ? <ul className="space-y-3">{data.notifications.map((item) => <li key={item.id} className="text-sm"><p className="font-medium">{item.title}{!item.is_read && " · Unread"}</p><p className="line-clamp-2 text-muted-foreground">{item.message}</p></li>)}</ul> : <p className="text-sm text-muted-foreground">No notifications yet.</p>}
      <Link className="mt-4 inline-block text-sm text-yellow-700 underline" to={`/${role}/notifications`}>View all notifications</Link>
    </CardContent></Card>
    <Card><CardHeader><CardTitle>Messages ({data.unread_messages} unread)</CardTitle></CardHeader><CardContent>
      {data.messages.length ? <ul className="space-y-3">{data.messages.map((item) => <li key={item.id} className="text-sm"><p className="font-medium">{item.subject || "Message"}{!item.is_read && " · Unread"}</p><p className="line-clamp-2 text-muted-foreground">{item.body}</p></li>)}</ul> : <p className="text-sm text-muted-foreground">No messages yet.</p>}
      <Link className="mt-4 inline-block text-sm text-yellow-700 underline" to={`/${role}/messages`}>View all messages</Link>
    </CardContent></Card>
  </div>;
}
