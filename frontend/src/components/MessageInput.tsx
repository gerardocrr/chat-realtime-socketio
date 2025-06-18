import React, { useState } from "react";
import { socket } from "../socket";

export const MessageInput = ({}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-gray-100 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-full transition-all ${
            message.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
