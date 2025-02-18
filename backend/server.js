import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/auth.js";
import Message from "./models/Message.js"; // Import Message model

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
  methods: ["GET", "POST"],
});

app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();

// 🔹 Socket.io Logic
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    console.log("Received message:", data);

    try {
      // 🔹 Save message to MongoDB
      const newMessage = new Message({ text: data.text, sender: socket.id });
      await newMessage.save();

      // 🔹 Emit the message to all clients
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.use("/api/auth", authRoutes);

server.listen(5000, () => console.log("Server running on port 5000"));
