import React from 'react';
import { Bot, User, Check, Copy } from 'lucide-react';

/**
 * Helper to render rich markdown-like text with bold, bullet lists, and links
 */
const formatMessageText = (text) => {
  if (!text) return null;

  // Split text by lines to parse lists and paragraphs
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    // Check if line is empty (paragraph break)
    if (!line.trim()) {
      return <div key={lineIndex} className="msg-break" />;
    }

    // Process bold, links, and bullets within line
    let formattedParts = [];
    let remaining = line;

    // Check for bullet line
    const isBullet = /^\s*([•\-\*]|\d+\.)\s+(.+)$/.test(remaining);
    let bulletPrefix = null;
    if (isBullet) {
      const match = remaining.match(/^\s*([•\-\*]|\d+\.)\s+(.+)$/);
      bulletPrefix = match[1];
      remaining = match[2];
    }

    // Parse bold text **bold** and links [text](url)
    const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = remaining.split(tokenRegex);

    formattedParts = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <a
              key={pIdx}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-link"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIndex} className="chat-bullet-row">
          <span className="chat-bullet-dot">{bulletPrefix.length === 1 ? '•' : bulletPrefix}</span>
          <span className="chat-bullet-text">{formattedParts}</span>
        </div>
      );
    }

    return (
      <p key={lineIndex} className="chat-paragraph">
        {formattedParts}
      </p>
    );
  });
};

const Message = ({ message }) => {
  const [copied, setCopied] = React.useState(false);
  const isBot = message.sender === 'bot';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot-wrapper' : 'user-wrapper'}`}>
      {/* Bot Avatar (Left) */}
      {isBot && (
        <div className="avatar bot-avatar" title="Easwari AI Assistant">
          <Bot size={20} />
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div className="message-header">
          <span className="sender-name">{isBot ? 'Easwari AI Assistant' : 'You'}</span>
          <span className="timestamp">{message.timestamp || 'Just now'}</span>
          {isBot && (
            <button
              onClick={handleCopy}
              className="copy-btn"
              title="Copy answer"
              aria-label="Copy text"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            </button>
          )}
        </div>

        <div className="message-body">
          {formatMessageText(message.text)}
        </div>

        {/* Category tag for bot response if provided */}
        {isBot && message.category && message.category !== 'unknown' && message.category !== 'greeting' && (
          <div className="category-pill">
            <span>Enquiry: {message.category}</span>
          </div>
        )}
      </div>

      {/* User Avatar (Right) */}
      {!isBot && (
        <div className="avatar user-avatar" title="Student / Visitor">
          <User size={20} />
        </div>
      )}
    </div>
  );
};

export default Message;
