import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
          {isStreaming && "▊"}
        </div>
      </div>
    </div>
  );
}