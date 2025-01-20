import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

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
        "flex w-full mb-2 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
           <ReactMarkdown
            className="prose-sm dark:prose-invert max-w-none"
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={cn(className, 'bg-muted px-1.5 py-0.5 rounded-md')}>
                    {children}
                  </code>
                );
              },
              // Style links
              a: ({ children, ...props }) => (
                <a {...props} className="text-primary hover:underline">
                  {children}
                </a>
              ),
              // Style lists
              ul: ({ children }) => (
                <ul className="list-disc pl-4 my-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 my-2">{children}</ol>
              ),
              // Style headings
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold my-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold my-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold my-2">{children}</h3>
              ),
              // Style blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-2 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
    </div>
  );
}