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
    name: "Room #1",
    lastMessage: "Hey! How was your day?",
    isOnline: true,
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
