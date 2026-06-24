import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, MoreVertical, Paperclip } from "lucide-react";
import { useRole } from "@/lib/role-context";

// Mock threads
const THREADS = [
  {
    id: "t1",
    name: "Webb Construction Group",
    jobTitle: "Electrical rough-in, 3200 sqft",
    lastMessage: "Sounds good, we'll see you on site Tuesday morning.",
    time: "10:42 AM",
    unread: true,
    role: "contractor",
    avatar: ""
  },
  {
    id: "t2",
    name: "Pacific Concrete Crew",
    jobTitle: "Foundation formwork",
    lastMessage: "Can you send over the updated drawings?",
    time: "Yesterday",
    unread: false,
    role: "subcontractor",
    avatar: "/avatar-sione.png"
  }
];

const MESSAGES = [
  { id: "m1", sender: "other", text: "Hi Ryan, thanks for the bid on the electrical rough-in.", time: "Monday 9:00 AM" },
  { id: "m2", sender: "other", text: "Are you able to start on the 15th instead of the 18th? We had a schedule shift.", time: "Monday 9:01 AM" },
  { id: "m3", sender: "me", text: "Let me check with the team and get back to you.", time: "Monday 9:45 AM" },
  { id: "m4", sender: "me", text: "Yes, we can make the 15th work. We'll need access to the site by 7am.", time: "Monday 11:30 AM" },
  { id: "m5", sender: "other", text: "Sounds good, we'll see you on site Tuesday morning.", time: "10:42 AM" },
];

export default function Messages() {
  const { role } = useRole();
  const [activeThread, setActiveThread] = useState(THREADS[0].id);
  const [message, setMessage] = useState("");

  const displayThreads = role === "contractor" 
    ? THREADS.filter(t => t.role === "subcontractor")
    : THREADS.filter(t => t.role === "contractor");
    
  // Fallback if filtering leaves none
  const threadsToUse = displayThreads.length > 0 ? displayThreads : THREADS;

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-border rounded-md shadow-sm overflow-hidden flex flex-col md:flex-row">
      
      {/* Threads List */}
      <div className="w-full md:w-80 border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-[#0f2a4a] mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-gray-50 text-sm h-9" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {threadsToUse.map(thread => (
            <button
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`w-full text-left p-4 flex gap-3 border-b border-border transition-colors hover:bg-gray-50 ${
                activeThread === thread.id ? 'bg-blue-50/50 relative' : ''
              }`}
            >
              {activeThread === thread.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f2a4a]" />
              )}
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={thread.avatar} />
                <AvatarFallback>{thread.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className={`font-semibold text-sm truncate ${thread.unread ? 'text-[#0f2a4a]' : 'text-foreground'}`}>
                    {thread.name}
                  </span>
                  <span className={`text-[10px] shrink-0 ml-2 ${thread.unread ? 'font-bold text-[#0f2a4a]' : 'text-muted-foreground'}`}>
                    {thread.time}
                  </span>
                </div>
                <div className="text-xs text-[#0f2a4a]/70 font-medium truncate mb-1">{thread.jobTitle}</div>
                <div className={`text-xs truncate ${thread.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  {thread.lastMessage}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shrink-0">
          <div>
            <h3 className="font-semibold text-[#0f2a4a]">Webb Construction Group</h3>
            <p className="text-xs text-muted-foreground">Electrical rough-in, 3200 sqft</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {MESSAGES.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
              <div 
                className={`max-w-[75%] rounded-md px-4 py-2.5 text-sm ${
                  msg.sender === 'me' 
                    ? 'bg-[#0f2a4a] text-white' 
                    : 'bg-white border border-border text-foreground shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 mx-1 font-mono">
                {msg.time}
              </span>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-white border-t border-border shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); setMessage(""); }}
            className="flex gap-2"
          >
            <Button type="button" variant="outline" size="icon" className="shrink-0 border-border">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1"
            />
            <Button type="submit" className="bg-[#0f2a4a] hover:bg-[#0f2a4a]/90 text-white shrink-0">
              <Send className="w-4 h-4 mr-2" /> Send
            </Button>
          </form>
        </div>
      </div>

    </div>
  );
}
