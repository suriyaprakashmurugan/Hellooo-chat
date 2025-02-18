import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("messages", messages);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage); // Cleanup listener on unmount
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: message });
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg.text}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
