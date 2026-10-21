import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, CornerDownLeft, Sparkles } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Keep input focused after bot finishes reply
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const trimmed = inputText.trim();
    if (!trimmed) {
      setValidationError('Please enter a question before sending.');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    setValidationError('');
    onSendMessage(trimmed);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-wrapper">
      {validationError && (
        <div className="input-validation-alert">
          <AlertCircle size={15} />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-field-container">
          <Sparkles className="input-decor-icon" size={18} />
          <input
            ref={inputRef}
            type="text"
            className="chat-text-input"
            placeholder={
              isLoading
                ? 'Easwari AI Assistant is thinking...'
                : 'Ask anything about courses, admissions, fees, hostel, placements...'
            }
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (validationError) setValidationError('');
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={350}
          />
          <span className="enter-hint">Press ↵</span>
        </div>

        <button
          type="submit"
          className="chat-send-btn"
          disabled={isLoading || !inputText.trim()}
          title="Send message (Enter)"
        >
          {isLoading ? (
            <div className="btn-spinner" />
          ) : (
            <>
              <span>Send</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
