import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import SuggestedQuestions from '../components/SuggestedQuestions';
import { sendChatMessage } from '../services/api';
import { Sparkles, MessageSquareHeart, ShieldCheck } from 'lucide-react';

const INITIAL_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  sender: 'bot',
  text: 'Hello! 👋 Welcome to the Easwari Engineering College AI Enquiry Assistant. I can help you with admissions, courses, departments, fees, placements, facilities, hostel information, contact details and other college-related enquiries. How can I help you?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  category: 'welcome',
};

const Chatbot = () => {
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [customSuggestions, setCustomSuggestions] = useState([]);

  const handleSendMessage = async (text) => {
    if (!text || !text.trim() || isLoading) return;

    setError('');
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message to conversation history
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: nowTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call backend POST /api/chat via Axios
      const data = await sendChatMessage(text.trim());

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        category: data.category,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setCustomSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Unable to connect to the chatbot. Please try again.');

      const fallbackBotMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: '⚠️ Unable to connect to the chatbot service. Please ensure the backend server and MongoDB database are running.',
        category: 'error',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        id: `msg-welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setError('');
    setCustomSuggestions([]);
  };

  return (
    <div className="chatbot-page-container">
      {/* Top Page Header */}
      <div className="chatbot-hero-header">
        <div className="header-badge">
          <Sparkles size={14} />
          <span>Real-time Intelligent College Help Desk</span>
        </div>
        <h1 className="chatbot-main-heading">AI Chatbot for College Enquiry</h1>
        <p className="chatbot-subheading">
          Ask questions naturally about programs, cutoffs, tuition fees, campus life, hostels, and corporate placements.
        </p>
      </div>

      <div className="chatbot-main-layout">
        {/* Left Column: Chat Window and Input */}
        <div className="chatbot-interactive-col">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onClearChat={handleClearChat}
          />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>

        {/* Right Column: Suggested Questions & Popular Enquiries Sidebar */}
        <div className="chatbot-sidebar-col">
          <SuggestedQuestions
            onSelectQuestion={handleSendMessage}
            customSuggestions={customSuggestions}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
