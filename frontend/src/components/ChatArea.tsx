import { useEffect, useRef, useState } from "react";
import { MessageBubble, type Message } from "./MessageBubble";

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

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setMessages(mockMessages[1]);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500">
                Start the conversation by sending a message.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
