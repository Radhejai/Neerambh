import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, HelpCircle, Loader2, RefreshCw, BookmarkCheck, LayoutGrid, CheckCircle } from 'lucide-react';
import { Message, Service } from '../types';
import { SERVICES } from '../data';

interface RoyalAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  onSelectServices: (ids: string[]) => void;
  setCurrentTab: (tab: string) => void;
}

export default function RoyalAdvisor({ isOpen, onClose, selectedServices, onSelectServices, setCurrentTab }: RoyalAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Greetings, esteemed business partner. I am the **Neerambh Compliance Advisor**, your direct resource for tax, registration, and bookkeeping guidance, powered by advanced AI models.\n\nDescribe your business venture to me (e.g., whether you trade goods, register globally, maintain a particular tax turnover, or need bookkeeping support). I shall formulate a bespoke compliance architecture mapping our premium services directly to your needs.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedRecs, setParsedRecs] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  // Regular expression to parse the custom XML-like <recommendations> tag
  const processServerResponse = (text: string): { cleanText: string; serviceIds: string[] } => {
    const regex = /<recommendations>([\s\S]*?)<\/recommendations>/i;
    const match = text.match(regex);
    let cleanText = text.replace(regex, '').trim();
    let serviceIds: string[] = [];
    
    if (match && match[1]) {
      try {
        serviceIds = JSON.parse(match[1].trim());
      } catch (err) {
        console.error("Failed to parse recommended service IDs", err);
      }
    }
    return { cleanText, serviceIds };
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input;
    setInput('');
    setIsLoading(true);

    const newUserMessage: Message = {
      id: "msg_" + Date.now(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Sovereign server failed to deliver advisor response.");
      }

      const data = await response.json();
      const { cleanText, serviceIds } = processServerResponse(data.text);

      const newAssistantMessage: Message = {
        id: "msg_" + (Date.now() + 1),
        sender: 'assistant',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: serviceIds
      };

      setMessages(prev => [...prev, newAssistantMessage]);
      
      if (serviceIds.length > 0) {
        setParsedRecs(serviceIds);
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          id: "msg_" + (Date.now() + 1),
          sender: 'assistant',
          text: `**System Alert**: I am temporarily unable to formulate guidance. Please verify your internet connection or check if your **GEMINI_API_KEY** is active inside the Secrets section.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyRecommendations = () => {
    if (parsedRecs.length === 0) return;
    
    // Add recommended services to the parent selection
    const updated = Array.from(new Set([...selectedServices, ...parsedRecs]));
    onSelectServices(updated);
    setParsedRecs([]); // Clear highlighted notification once applied
  };

  // Pre-fill query suggestions for business types
  const suggestions = [
    "I am launching a new tech startup. What do I need?",
    "Which GST filings apply to micro-businesses?",
    "We plan to import raw materials. What licenses apply?"
  ];

  const handleSuggestClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const resetConsultation = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Greetings, esteemed business partner. I am the **Neerambh Compliance Advisor**, your direct resource for tax, registration, and bookkeeping guidance, powered by advanced AI models.\n\nDescribe your business venture to me (e.g., whether you trade goods, register globally, maintain a particular tax turnover, or need bookkeeping support). I shall formulate a bespoke compliance architecture mapping our premium services directly to your needs.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setParsedRecs([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-royal-950/40 backdrop-blur-sm">
      {/* Sidebar overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sidebar Container */}
      <div className="relative flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#0C0F16]/95 backdrop-blur-2xl shadow-2xl royal-glow">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-500/30 bg-royal-950 royal-glow">
              <Sparkles className="h-4 w-4 text-gold-400 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-white tracking-wider">NEERAMBH COMPLIANCE PORTAL</h2>
              <p className="text-[10px] uppercase tracking-widest text-gold-500">Autonomous AI Advisor</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={resetConsultation} 
              title="Reset Consultation"
              className="rounded p-1.5 text-royal-400 hover:bg-royal-900 hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button 
              onClick={onClose} 
              className="rounded p-1.5 text-royal-400 hover:bg-royal-900 hover:text-gold-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat History Panel */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gold-500/10 text-gold-100 border border-gold-500/20 rounded-tr-none'
                    : 'bg-royal-900/50 text-royal-200 border border-royal-800 rounded-tl-none'
                }`}
              >
                {/* Parse Markdown-like highlights like bold text */}
                <div className="whitespace-pre-wrap font-light">
                  {m.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                      {paragraph.split('**').map((chunk, i) => {
                        if (i % 2 === 1) {
                          return <strong key={i} className="font-bold text-gold-400">{chunk}</strong>;
                        }
                        return chunk;
                      })}
                    </p>
                  ))}
                </div>

                {/* Display Specific Recommendations within message block if parsed */}
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="mt-4 border-t border-royal-800/80 pt-3">
                    <span className="block text-[10px] uppercase tracking-widest text-gold-400 mb-2 font-bold">Matched Strategic Services</span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.recommendations.map(recId => {
                        const s = SERVICES.find(srv => srv.id === recId);
                        if (!s) return null;
                        return (
                          <span key={recId} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-royal-950 text-royal-300 text-[10px] border border-royal-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                            <span>{s.title}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-royal-500 mt-1 px-1 font-mono">
                {m.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex items-start space-x-2">
              <div className="rounded-xl rounded-tl-none bg-royal-900/50 p-4 border border-royal-800 text-royal-400 text-xs flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-gold-500" />
                <span className="font-serif italic tracking-wide">Advisor formulating counsel...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Highlight overlay */}
        {parsedRecs.length > 0 && (
          <div className="mx-6 mb-3 p-3 rounded-lg border border-gold-500/30 bg-gold-500/5 flex items-center justify-between royal-glow">
            <div className="flex items-center space-x-2.5">
              <BookmarkCheck className="h-5 w-5 text-gold-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Recommended Setup Detected</p>
                <p className="text-[10px] text-royal-300">{parsedRecs.length} royal services matched. Apply to quote?</p>
              </div>
            </div>
            <div className="flex space-x-1.5">
              <button
                onClick={handleApplyRecommendations}
                className="px-3 py-1.5 rounded bg-gold-500 text-royal-950 text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center space-x-1"
              >
                <CheckCircle className="h-3 w-3" />
                <span>Apply</span>
              </button>
              <button
                onClick={() => setParsedRecs([])}
                className="px-2 py-1.5 rounded bg-royal-900 text-royal-400 hover:text-white text-[10px] transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Suggestions Tray */}
        <div className="px-6 pb-2">
          <div className="flex items-center space-x-1 mb-2 text-royal-400">
            <HelpCircle className="h-3 w-3" />
            <span className="text-[10px] uppercase tracking-wider">Example Consults</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            {suggestions.map((s, index) => (
              <button
                key={index}
                onClick={() => handleSuggestClick(s)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-royal-900/30 border border-royal-800/40 text-royal-300 hover:text-white hover:border-gold-500/20 hover:bg-royal-900/60 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="border-t border-royal-800/80 bg-royal-900/40 px-6 py-4 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your enterprise brief..."
            className="flex-1 bg-royal-950 text-white border border-royal-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500/50 focus:royal-glow transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-royal-950 font-bold hover:brightness-110 transition-all disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
