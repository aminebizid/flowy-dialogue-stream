import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  isStreaming?: boolean;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ChatMessage = ({ content, isBot, isStreaming }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}: CodeProps) {
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
    </div>
  );
}