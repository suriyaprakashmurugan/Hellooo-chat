import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    sender: { type: String, required: true }, // Store sender's ID or name
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
