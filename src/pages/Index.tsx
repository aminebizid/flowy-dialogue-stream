import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";

interface Message {
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", isBot: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedText]);

  const simulateStream = async (response: string) => {
    setIsTyping(true);
    setStreamedText("");
    
    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setStreamedText((prev) => prev + response[i]);
    }
    
    setMessages((prev) => [...prev, { content: response, isBot: true }]);
    setStreamedText("");
    setIsTyping(false);
  };

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { content: message, isBot: false }]);
    
    // Simulate bot response
    const responses = [
      "I understand your question. Let me **help** you with that.```python\nprint(a)\n```",
      "That's an **interesting** point! Here's what I think...```python\nprint(a)\n```",
      "I'd be happy to **assist** you with that request.```python\nprint(a)\n```",
      "Let me provide some **information** about that.```python\nprint(a)\n```",
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await simulateStream(randomResponse);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            isBot={message.isBot}
          />
        ))}
        {streamedText && (
          <ChatMessage content={streamedText} isBot={true} isStreaming={true} />
        )}
        {isTyping && !streamedText && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 bg-background pt-4">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;