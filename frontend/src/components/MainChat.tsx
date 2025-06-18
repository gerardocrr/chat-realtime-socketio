import { ChatHeader } from "./ChatHeader";
import { ChatArea } from "./ChatArea";
import { MessageInput } from "./MessageInput";
import { ChatSidebar } from "./ChatSidebar";
import type { Message } from "./MessageBubble";
import { useEffect, useState } from "react";
import { socket } from "../socket";

export const MainChat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatSidebar isOnline={isConnected} />
      <div className="flex-1 flex flex-col">
        <ChatHeader contactName="Room #1" isOnline={isConnected} />
        <ChatArea
          messages={messages}
          setMessages={setMessages}
          isOnline={isConnected}
        />
        <MessageInput
          messages={messages}
          setMessages={setMessages}
          isOnline={isConnected}
        />
      </div>
    </div>
  );
};
