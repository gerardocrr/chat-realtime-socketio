import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT ?? 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-realtime-socketio.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (content) => {
    socket.broadcast.emit("message", {
      id: crypto.randomUUID(),
      content,
      from: socket.id,
    });
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
