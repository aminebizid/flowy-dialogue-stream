export const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 px-4 py-2 bg-chat-bot rounded-2xl w-16">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-400 rounded-full animate-blink"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};