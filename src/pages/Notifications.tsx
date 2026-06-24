import { Bell, FileText, CheckCircle2, MessageSquare, Star } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "bid_received",
      title: "New Bid Received",
      desc: "Thorpe Electrical Services submitted a bid for 'Electrical rough-in'.",
      time: "2 hours ago",
      icon: FileText,
      unread: true,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      desc: "Marcus Webb sent you a message regarding 'Foundation formwork'.",
      time: "5 hours ago",
      icon: MessageSquare,
      unread: true,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      id: 3,
      type: "job_awarded",
      title: "Job Awarded!",
      desc: "You were awarded the job 'Electrical rough-in, 3200 sqft'.",
      time: "Yesterday",
      icon: CheckCircle2,
      unread: false,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      desc: "Sarah Jenkins left you a 4-star review.",
      time: "2 days ago",
      icon: Star,
      unread: false,
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2a4a] mb-1">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated on your account activity.</p>
        </div>
        <button className="text-sm font-medium text-[#0f2a4a] hover:underline">Mark all as read</button>
      </div>

      <div className="bg-white border border-border rounded-md shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-5 flex gap-4 transition-colors hover:bg-gray-50 ${notif.unread ? 'bg-blue-50/20' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                <notif.icon className={`w-5 h-5 ${notif.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`text-sm font-semibold truncate ${notif.unread ? 'text-[#0f2a4a]' : 'text-foreground'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono shrink-0">{notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notif.desc}</p>
              </div>
              {notif.unread && (
                <div className="w-2 h-2 rounded-full bg-[#0f2a4a] mt-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
