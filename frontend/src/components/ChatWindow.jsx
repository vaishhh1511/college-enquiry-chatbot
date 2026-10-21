import React, { useRef, useEffect } from 'react';
import Message from './Message';
import { Bot, Trash2, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

const ChatWindow = ({ messages, isLoading, error, onClearChat }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window-card">
      {/* Chat Window Header */}
      <div className="chat-window-header">
        <div className="bot-status-group">
          <div className="bot-header-avatar">
            <Bot size={22} />
            <span className="online-indicator" title="AI Bot is active"></span>
          </div>
          <div className="bot-header-details">
            <div className="header-title-line">
              <h3 className="bot-title">Easwari College Enquiry AI</h3>
              <span className="ai-system-tag">
                <Sparkles size={11} /> MERN Powered
              </span>
            </div>
            <p className="bot-status-text">Instant 24/7 Admissions & Campus Guidance</p>
          </div>
        </div>

        {/* Clear Chat Action */}
        <button
          onClick={onClearChat}
          className="clear-chat-btn"
          title="Clear conversation history"
        >
          <Trash2 size={15} />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="chat-messages-area">
        {messages.map((msg, index) => (
          <Message key={msg.id || index} message={msg} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="message-wrapper bot-wrapper loading-wrapper">
            <div className="avatar bot-avatar">
              <Bot size={20} />
            </div>
            <div className="message-bubble bot-bubble typing-bubble">
              <div className="typing-dots">
                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
              </div>
              <span className="typing-text">Easwari AI is searching college database...</span>
            </div>
          </div>
        )}

        {/* Error Notification Banner */}
        {error && (
          <div className="chat-error-banner">
            <AlertTriangle size={18} className="error-icon" />
            <div className="error-text">
              <strong>Connection Notice:</strong> {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
