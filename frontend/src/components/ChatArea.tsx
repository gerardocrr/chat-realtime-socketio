import { useEffect, useRef } from "react";
import { MessageBubble, type Message } from "./MessageBubble";
import LoadingScreen from "./LoadingScreen";
import { socket } from "../socket";

interface ChatAreaProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOnline: boolean;
}

export const ChatArea = ({
  messages,
  setMessages,
  isOnline,
}: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const receiveMesaage = (mesaage: any) => {
    setMessages((state) => [...state, mesaage]);
  };

  useEffect(() => {
    scrollToBottom();
    socket.on("message", receiveMesaage);

    return () => {
      socket.off("message", receiveMesaage);
    };
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {!isOnline ? (
        <LoadingScreen />
      ) : (
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
      )}
    </div>
  );
};
