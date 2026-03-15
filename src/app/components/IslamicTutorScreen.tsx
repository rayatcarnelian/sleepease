import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen } from 'lucide-react';
import { Language } from '../translations';

type Message = { id: number; text: string; sender: 'user' | 'bot'; timestamp?: string; };
type Screen = 'mode-selection' | 'general-home' | 'islamic-home' | 'mood-check-general' | 'mood-check-islamic' | 'content-general' | 'content-islamic' | 'ai-chat' | 'ai-chat-islamic' | 'mood-history-general' | 'mood-history-islamic' | 'settings' | 'settings-islamic' | 'language-selection' | 'reading-general' | 'reading-islamic' | 'islamic-tutor';
type Mode = 'general' | 'islamic' | null;

interface IslamicTutorScreenProps {
  navigate: (screen: Screen, mode?: Mode) => void;
  currentLanguage?: Language;
  userName?: string;
}

const quickPrompts = [
  { text: "Tell me about Ramadan", icon: "🌙" },
  { text: "Rules of Zakah", icon: "💰" },
  { text: "Patience in Quran", icon: "📖" },
  { text: "Etiquettes of eating", icon: "🍽️" },
];

export default function IslamicTutorScreen({ navigate, currentLanguage = 'en', userName }: IslamicTutorScreenProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: `As-salamu alaykum${userName ? `, ${userName}` : ''}! I am your Islamic knowledge tutor. Ask me about any topic, and I will share authentic guidance from the Quran and Sahih Hadith. Insha'Allah, we will learn together. 📖`, sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendToAI = async (userText: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev: Message[]) => [...prev, { id: messages.length + 1, text: userText, sender: 'user', timestamp }]);
    setMessage('');
    setIsTyping(true);

    try {
      const chatHistory = messages.map((msg: Message) => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      chatHistory.push({ role: 'user', content: userText });
      
      const systemPrompt = {
        role: 'system',
        content: "You are an expert, highly knowledgeable authentic Islamic Tutor. Your purpose is to provide authentic Islamic knowledge. When asked about a topic, you MUST always provide relevant Ayahs from the Quran (with English translation and Surah:Ayah reference) and authentic Hadiths (preferably Sahih Bukhari or Sahih Muslim, with reference). Do not give personal opinions, stick strictly to authentic texts (Quran and Sahih Sunnah) and mainstream scholarly consensus. Structure your answer beautifully with bolded sections: **Quranic Guidance:** and **Hadith & Sunnah:**. End with a short encouraging note."
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
      const reply = data.choices[0]?.message?.content || "May Allah increase us in beneficial knowledge.";
      
      setMessages((prev: Message[]) => [...prev, { id: Date.now(), text: reply, sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      console.error("Islamic Tutor error:", error);
      setMessages((prev: Message[]) => [...prev, { id: Date.now(), text: "SubhanAllah, I'm having trouble connecting right now to retrieve the references. Please try again later.", sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    } finally { setIsTyping(false); }
  };

  const handleSendMessage = () => { if (message.trim()) sendToAI(message); };
  const handleQuickPrompt = (promptText: string) => {
    setMessage(promptText);
    setTimeout(() => { if (promptText.trim()) sendToAI(promptText); }, 100);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSendMessage(); };

  const showQuickPrompts = messages.length === 1;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-amber-500/20 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
          <BookOpen className="w-5 h-5 text-amber-950" />
        </div>
        <div>
          <h1 className="text-white text-lg font-medium">Islamic Knowledge Tutor</h1>
          <p className="text-emerald-100/70 text-xs flex items-center gap-1">Quran & Authentic Hadith Companion</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-2 custom-scrollbar">
        {messages.map((msg: Message) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-amber-600 to-yellow-600 text-white rounded-br-md shadow-lg shadow-amber-500/20'
                : 'bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-bl-md shadow-lg'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300 font-semibold mt-2 block">$1</strong>') }} />
              {msg.timestamp && <p className={`text-xs mt-2 opacity-60 ${msg.sender === 'user' ? 'text-amber-100/70 text-right' : 'text-emerald-100/50 text-left'}`}>{msg.timestamp}</p>}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-3.5 rounded-2xl rounded-bl-md shadow-lg">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {showQuickPrompts && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 px-2">
          {quickPrompts.map((prompt, index) => (
            <button key={index} onClick={() => handleQuickPrompt(prompt.text)} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center sm:text-left transition-all hover:bg-white/10 hover:border-amber-500/30 active:scale-95 shadow-md">
              <span className="text-3xl sm:text-2xl mb-2 sm:mb-1 block">{prompt.icon}</span>
              <span className="text-white/80 text-sm">{prompt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="pt-4 border-t border-amber-500/20">
        <div className="flex gap-3 items-center">
          <input
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            placeholder="Ask about a topic (e.g. Zakah, Patience, Ramadan)..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all text-sm shadow-inner"
            onKeyPress={handleKeyPress}
          />
          <button 
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              message.trim() ? 'bg-gradient-to-br from-amber-500 to-yellow-600 hover:opacity-90 active:scale-95 shadow-lg shadow-amber-500/20' : 'bg-white/10 opacity-50 cursor-not-allowed'
            }`}
            onClick={handleSendMessage} disabled={!message.trim()}
          >
            <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-white/40'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
