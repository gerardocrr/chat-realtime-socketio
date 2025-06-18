import { ChatSidebar } from "./components/ChatSidebar";
import { ChatHeader } from "./components/ChatHeader";
import { ChatArea } from "./components/ChatArea";
import { MessageInput } from "./components/MessageInput";

function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader contactName="Room #1" isOnline={true} />
        <ChatArea />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;
