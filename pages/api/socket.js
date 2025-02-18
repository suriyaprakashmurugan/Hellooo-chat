import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, { path: "/api/socket" });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User Connected:", socket.id);

      socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
      });
    });
  }

  res.end();
}
