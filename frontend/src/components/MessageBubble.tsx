import React from "react";

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "me" | "other";
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isMe
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-gray-100 text-gray-900 rounded-bl-md"
        } shadow-sm`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div
          className={`flex items-center justify-end mt-1 space-x-1 ${
            isMe ? "text-blue-100" : "text-gray-500"
          }`}
        >
          <span className="text-xs">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
};
