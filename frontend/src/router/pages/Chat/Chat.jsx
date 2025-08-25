// chat.jsx
import React, { useEffect, useState, useRef } from "react";
import { Search, Send } from "lucide-react";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  // Dummy Data (fallback)
  const dummyConversations = [
    {
      id: 1,
      designer: { name: "Sophia Carter", avatar: "https://i.pravatar.cc/150?img=1" },
      client: { name: "Sarah Miller", avatar: "https://i.pravatar.cc/150?img=2" },
      project: "Modern Living Room",
      messages: [
        { sender: "Sarah Miller", avatar: "https://i.pravatar.cc/150?img=2", text: "Hi Alex, I’m really excited to start working with you on this project. I’ve attached a brief with all the details. Let me know if you have any questions." },
        { sender: "Sophia Carter", avatar: "https://i.pravatar.cc/150?img=1", text: "Hi Sarah, thanks for the brief! I've reviewed it and it looks great. I have a few clarifying questions, though. When you say 'modern,' what specific design elements are you envisioning?" },
        { sender: "Sarah Miller", avatar: "https://i.pravatar.cc/150?img=2", text: "I’m thinking clean lines, minimalist aesthetic, and a focus on typography. Something that feels both contemporary and timeless." },
        { sender: "Sophia Carter", avatar: "https://i.pravatar.cc/150?img=1", text: "Perfect, that’s exactly the direction I was thinking. I'll start working on some initial concepts and have them to you by the end of the week. How does that sound?" },
        { sender: "Sarah Miller", avatar: "https://i.pravatar.cc/150?img=2", text: "Sounds great, Alex! Looking forward to seeing your ideas." },
      ],
    },
    {
      id: 2,
      designer: { name: "Emily Wong", avatar: "https://i.pravatar.cc/150?img=3" },
      client: { name: "David Lee", avatar: "https://i.pravatar.cc/150?img=4" },
      project: "Scandinavian Apartment",
      messages: [
        { sender: "David Lee", avatar: "https://i.pravatar.cc/150?img=4", text: "Hey Emily, can we go for a Scandinavian style this time?" },
      ],
    },
  ];

  // Fetch API or fallback
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/conversations");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.warn("API failed, using dummy data", err);
        setConversations(dummyConversations);
        setSelectedConversation(dummyConversations[0]);
        setMessages(dummyConversations[0].messages);
      }
    };
    fetchConversations();
  }, []);

  // WebSocket init
  useEffect(() => {
    ws.current = new WebSocket("wss://your-websocket-url");
    ws.current.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMsg]);
    };
    return () => ws.current.close();
  }, []);

  // Handle send
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      sender: selectedConversation?.designer.name || "You",
      avatar: selectedConversation?.designer.avatar,
      text: input,
    };
    setMessages((prev) => [...prev, newMsg]);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(newMsg));
    }
    setInput("");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-white p-4 flex flex-col">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        {/* Filters */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Filters</h3>
        <select className="w-full border rounded p-2 mb-2 text-sm">
          <option>Date</option>
        </select>
        <select className="w-full border rounded p-2 mb-2 text-sm">
          <option>User Type</option>
        </select>
        <select className="w-full border rounded p-2 mb-4 text-sm">
          <option>Status</option>
        </select>

        {/* Conversations */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2">All Conversations</h3>
        <div className="space-y-2 overflow-y-auto">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedConversation?.id === c.id ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelectedConversation(c);
                setMessages(c.messages);
              }}
            >
              <img
                src={c.designer.avatar}
                alt={c.designer.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Designer: {c.designer.name}</p>
                <p className="text-xs text-gray-500">Client: {c.client.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation && (
          <>
            {/* Header */}
            <div className="p-4 border-b bg-white">
              <h2 className="text-lg font-semibold">
                Project: {selectedConversation.project}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end space-x-2 ${
                    m.sender === selectedConversation.designer.name
                      ? "justify-end space-x-reverse"
                      : "justify-start"
                  }`}
                >
                  {/* Avatar */}
                  <img src={m.avatar} alt={m.sender} className="w-8 h-8 rounded-full" />

                  {/* Bubble */}
                  <div
                    className={`p-3 rounded-lg max-w-md ${
                      m.sender === selectedConversation.designer.name
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1"
              >
                <Send size={16} />
                <span className="text-sm">Send</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
