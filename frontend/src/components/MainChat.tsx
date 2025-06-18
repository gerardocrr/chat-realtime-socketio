import { ChatHeader } from "./ChatHeader";
import { ChatArea } from "./ChatArea";
import { MessageInput } from "./MessageInput";
import type { Message } from "./MessageBubble";
import { useState } from "react";

export const MainChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader contactName="Room #1" isOnline={true} />
      <ChatArea messages={messages} setMessages={setMessages} />
      <MessageInput messages={messages} setMessages={setMessages} />
    </div>
  );
};
