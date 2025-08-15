import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("chat message", ({ name, msg }) => {
    console.log(`${name} sent: ${msg}`);
    io.emit("chat message", { name, msg }); // ✅ broadcast to all clients
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
