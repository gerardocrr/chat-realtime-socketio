import { ChatSidebar } from "./components/ChatSidebar";
import { MainChat } from "./components/MainChat";

function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <ChatSidebar />
      {/* Main Chat Area */}
      <MainChat />
    </div>
  );
}

export default App;
