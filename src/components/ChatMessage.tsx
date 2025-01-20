import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  isStreaming?: boolean;
}

export const ChatMessage = ({ content, isBot, isStreaming }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          isBot ? "bg-chat-bot" : "bg-chat-user"
        )}
      >
        <div className="text-gray-800 whitespace-pre-wrap break-words prose dark:prose-invert prose-sm max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
          {isStreaming && "▊"}
        </div>
      </div>
    </div>
  );
}