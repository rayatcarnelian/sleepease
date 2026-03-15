import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Language } from '../translations';

type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'general-login' | 'islamic-login' | 'general-signup' | 'islamic-signup' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic';
type Mode = 'general' | 'islamic' | null;

interface AIChatSupportScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage: Language;
  userName: string;
}

const AIChatSupportScreen = ({ navigate, currentLanguage, userName }: AIChatSupportScreenProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: `Welcome${userName ? `, ${userName}` : ''}! I'm your SleepEase companion. How are you feeling tonight? I'm here to help you relax and find peace.`, sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { id: Date.now(), text: message, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = message;
    setMessage("");
    setIsTyping(true);

    try {
      // Map local messages to Groq API format
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Add the new user message
      chatHistory.push({ role: 'user', content: currentInput });
      
      // Add system prompt
      const systemPrompt = {
        role: 'system',
        content: "You are a gentle, empathetic wellness companion for an app called SleepEase. You help users relax, reduce anxiety, and find peace before sleep. Offer comforting advice and practical mindfulness tips. Keep responses concise and calming."
      };

      const payload = {
        model: "llama-3.3-70b-versatile",
        messages: [systemPrompt, ...chatHistory],
        temperature: 0.7,
        max_tokens: 1024
      };

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.json();
      const reply = data.choices[0]?.message?.content || "Take a deep breath. I'm here for you.";
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    } catch (error) {
      console.error("Connection error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting right now. Please make sure the backend is running (npm run dev on backend) and try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Chat Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white text-lg font-medium">AI Sleep Coach</h1>
          <p className="text-white/50 text-xs">Here to help you rest · General Mode</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl ${
              m.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3.5 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex gap-3 items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Share your feelings..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatSupportScreen;