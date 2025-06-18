import React from "react";

interface ChatHeaderProps {
  contactName: string;
  isOnline: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  contactName,
  isOnline,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        {/* Contact Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              {contactName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{contactName}</h2>
            <p className="text-xs text-gray-500">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
