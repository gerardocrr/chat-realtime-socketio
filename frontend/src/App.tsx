import { ChatSidebar } from "./components/ChatSidebar";
import { ChatHeader } from "./components/ChatHeader";
import { ChatArea } from "./components/ChatArea";
import { MessageInput } from "./components/MessageInput";
import type { Message } from "./components/MessageBubble";
import { useState } from "react";

// Mock data
const mockContacts = [
  {
    id: "1",
    name: "Sarah Wilson",
    lastMessage: "Hey! How was your day?",
    timestamp: "2m ago",
    unreadCount: 2,
    avatar: "SW",
    isOnline: true,
  },
  {
    id: "2",
    name: "Mike Johnson",
    lastMessage: "Thanks for the help yesterday!",
    timestamp: "1h ago",
    unreadCount: 0,
    avatar: "MJ",
    isOnline: false,
  },
  {
    id: "3",
    name: "Emma Davis",
    lastMessage: "Let's catch up soon 😊",
    timestamp: "3h ago",
    unreadCount: 1,
    avatar: "ED",
    isOnline: true,
  },
  {
    id: "4",
    name: "Alex Chen",
    lastMessage: "The project looks great!",
    timestamp: "1d ago",
    unreadCount: 0,
    avatar: "AC",
    isOnline: false,
  },
];

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      content: "Hey there! How are you doing?",
      timestamp: "10:30 AM",
      sender: "other",
    },
    {
      id: "2",
      content: "I'm doing great, thanks for asking! How about you?",
      timestamp: "10:32 AM",
      sender: "me",
    },
    {
      id: "3",
      content: "I'm good too! Just working on some exciting projects.",
      timestamp: "10:35 AM",
      sender: "other",
    },
    {
      id: "4",
      content: "That sounds amazing! I'd love to hear more about them.",
      timestamp: "10:37 AM",
      sender: "me",
    },
  ],
  "2": [
    {
      id: "5",
      content: "Thanks for your help with the presentation yesterday!",
      timestamp: "9:15 AM",
      sender: "other",
    },
    {
      id: "6",
      content: "You're welcome! It turned out really well.",
      timestamp: "9:20 AM",
      sender: "me",
    },
  ],
  "3": [
    {
      id: "7",
      content: "Hey! Long time no see 👋",
      timestamp: "8:45 AM",
      sender: "other",
    },
    {
      id: "8",
      content: "I know! We should definitely catch up soon.",
      timestamp: "8:50 AM",
      sender: "me",
    },
  ],
  "4": [
    {
      id: "9",
      content: "The new design looks fantastic!",
      timestamp: "Yesterday",
      sender: "other",
    },
    {
      id: "10",
      content: "Thank you! I put a lot of effort into it.",
      timestamp: "Yesterday",
      sender: "me",
    },
  ],
};

function App() {
  const [activeChat, setActiveChat] = useState("1");
  const [messages, setMessages] = useState<Message[]>(
    mockMessages[activeChat] || []
  );

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    setMessages(mockMessages[chatId] || []);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    mockMessages[activeChat] = updatedMessages;
  };

  const activeContact = mockContacts.find(
    (contact) => contact.id === activeChat
  );

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar
        contacts={mockContacts}
        activeChat={activeChat}
        onChatSelect={handleChatSelect}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeContact ? (
          <>
            <ChatHeader
              contactName={activeContact.name}
              isOnline={activeContact.isOnline}
              lastSeen="2h ago"
            />
            <ChatArea messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Welcome to Chat
              </h2>
              <p className="text-gray-500">
                Select a conversation to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
