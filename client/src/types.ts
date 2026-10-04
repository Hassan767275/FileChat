export type Message = {
    message: string,
    direction: "incoming" | "outgoing"
}

export interface Messages {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}
