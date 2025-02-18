import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../components/chat"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      <Chat />
    </div>
  );
}
