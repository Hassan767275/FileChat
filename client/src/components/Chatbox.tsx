import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
import type { Messages } from "../types";
import { askQuestion } from "../api";
import { useState } from "react";

export default function Chatbox({ messages, setMessages }: Messages) {
    const [loading, setLoading] = useState(false)

  async function sendMessage(newMessage: string) {
    setMessages(prev => [...prev, {message: newMessage, direction: "outgoing"}]);
    setLoading(true)
    const response = await askQuestion(newMessage)
    setLoading(false)
    setMessages(prev => [...prev, {message: response.answer, direction: "incoming"}])
  }

  return (
    <div className="my-4 border border-[#6651F5] w-100 h-100 ">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <Message
                key={message.message}
                model={{
                  message: message.message,
                  sentTime: "just now",
                  sender: message.direction === "outgoing" ? "user" : "ai",
                  direction: message.direction,
                  position: "single",
                }}
              />
            ))}
            {loading && <TypingIndicator content="Ai is thinking..." />}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={sendMessage} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
