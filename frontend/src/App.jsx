import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [initialBotQuery, setInitialBotQuery] = useState('');

  const handlePreloadQuery = (query) => {
    setInitialBotQuery(query);
  };

  return (
    <div className="app-root">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-viewport">
        {activeTab === 'home' && (
          <Home setActiveTab={setActiveTab} onPreloadQuery={handlePreloadQuery} />
        )}
        {activeTab === 'chatbot' && <Chatbot />}
        {activeTab === 'courses' && (
          <Courses setActiveTab={setActiveTab} onPreloadQuery={handlePreloadQuery} />
        )}
        {activeTab === 'about' && <About setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <Contact setActiveTab={setActiveTab} />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
