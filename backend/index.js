import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT ?? 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("create-something", (data, callback) => {
    io.emit("foo", data); // reenviar a todos
    callback(); // responder al frontend
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
