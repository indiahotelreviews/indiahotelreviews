import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { Hotel } from '../../types';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MapPin, 
  Star, 
  Key, 
  Trash2, 
  ChevronRight, 
  HelpCircle,
  Compass
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedHotels?: Hotel[];
  suggestedActions?: Array<{ label: string; action: () => void }>;
}

export const AIChatbot: React.FC = () => {
  const { hotels, selectedHotelSlug, navigateTo } = useApp();
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('ihr_gemini_api_key') || '');
  const [activeApiKey, setActiveApiKey] = useState(() => localStorage.getItem('ihr_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  
  const currentHotel = hotels.find((h) => h.slug === selectedHotelSlug);

  const initialWelcomeMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `Namaste! 🙏 I am your **India Stay Concierge**. I can help you discover genuine hotels, analyze authentic reviewer reality checks, compare luxury vs budget stays, and plan your Indian getaways.\n\nHow can I help your travel planning today?`,
    timestamp: 'Just now',
    suggestedActions: [
      { label: '🏰 Royal Heritage Palaces', action: () => handleSendPreset('Show me the top royal heritage palace stays in India') },
      { label: '🏖️ Best Goa Beach Resorts', action: () => handleSendPreset('Find the best luxury & boutique beach stays in Goa') },
      { label: '⛰️ Peaceful Himalayan Retreats', action: () => handleSendPreset('What are the best mountain & wellness retreats in the Himalayas?') },
      { label: '💰 Best Stays under ₹15,000', action: () => handleSendPreset('Recommend top-rated value for money stays under ₹15,000 per night') },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSaveApiKey = () => {
    localStorage.setItem('ihr_gemini_api_key', apiKeyInput.trim());
    setActiveApiKey(apiKeyInput.trim());
    setShowApiKeyModal(false);
    
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: apiKeyInput.trim() 
          ? `✅ Custom Gemini API key configured successfully! I will now use real-time LLM intelligence for your queries.` 
          : `Switched to the built-in Offline Editorial Stay Engine.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleClearChat = () => {
    setMessages([initialWelcomeMessage]);
  };

  const handleSendPreset = (presetText: string) => {
    processUserMessage(presetText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const msg = inputMessage.trim();
    setInputMessage('');
    processUserMessage(msg);
  };

  // Built-in intelligent stay matching & synthesis engine
  const generateOfflineResponse = (query: string): { text: string; recommendedHotels?: Hotel[]; suggestedActions?: Array<{ label: string; action: () => void }> } => {
    const q = query.toLowerCase();

    // Contextual hotel query (if user is looking at a specific hotel)
    if (currentHotel && (q.includes('this hotel') || q.includes('drawback') || q.includes('catch') || q.includes('pros') || q.includes('room') || q.includes('price') || q.includes('food') || q.includes('verdict'))) {
      if (q.includes('drawback') || q.includes('cons') || q.includes('catch') || q.includes('negative')) {
        return {
          text: `Here is the genuine **Reality Check** for **${currentHotel.name}** based on verified guest feedback:\n\n` +
            `⚠️ **Notable Nuances & Drawbacks:**\n` +
            currentHotel.realityCheck.drawbacks.map((d) => `• ${d}`).join('\n') +
            `\n\n📌 **Things to Keep in Mind:**\n` +
            currentHotel.realityCheck.notable.map((n) => `• ${n}`).join('\n') +
            `\n\n💡 **Overall Sentiment:** ${currentHotel.aiSummary.positiveSentiment}% of verified guests recommend this property.`,
          recommendedHotels: [currentHotel],
          suggestedActions: [
            { label: `View ${currentHotel.name} Details`, action: () => { setIsOpen(false); navigateTo('hotel-detail', currentHotel.slug); } }
          ]
        };
      }

      return {
        text: `Here is the editorial summary for **${currentHotel.name}** in ${currentHotel.location.city}, ${currentHotel.location.state}:\n\n` +
          `⭐ **Rating:** ${currentHotel.ratings.overall.toFixed(1)} / 5.0 (${currentHotel.reviewCount} verified reviews)\n` +
          `💵 **Pricing:** ${currentHotel.priceRangeText} (${currentHotel.priceTier})\n` +
          `✨ **Best Suited For:** ${currentHotel.bestSuitedFor.join(', ')}\n\n` +
          `📝 **Editorial Verdict:** “${currentHotel.editorialVerdict}”\n\n` +
          `🟢 **What Guests Love:** ${currentHotel.guestsLove.join(' · ')}`,
        recommendedHotels: [currentHotel],
      };
    }

    // Heritage / Palaces
    if (q.includes('heritage') || q.includes('palace') || q.includes('royal') || q.includes('rajasthan') || q.includes('udaipur') || q.includes('jaipur')) {
      const matched = hotels.filter((h) => 
        h.categories.includes('Heritage') || 
        h.location.state === 'Rajasthan' || 
        h.name.toLowerCase().includes('palace') || 
        h.name.toLowerCase().includes('haveli')
      ).slice(0, 3);

      return {
        text: `India has some of the world's most breathtaking living palaces and royal havelis. Here are our top-rated heritage stays verified for authenticity and architectural integrity:`,
        recommendedHotels: matched,
        suggestedActions: [
          { label: 'Explore All Heritage Stays', action: () => { setIsOpen(false); navigateTo('explore'); } }
        ]
      };
    }

    // Goa / Beach
    if (q.includes('goa') || q.includes('beach') || q.includes('coastal') || q.includes('resort') || q.includes('ocean')) {
      const matched = hotels.filter((h) => 
        h.location.state === 'Goa' || 
        h.categories.includes('Beach Resort') ||
        h.categories.includes('Resort')
      ).slice(0, 3);

      return {
        text: `Whether you want sunset sundowners in North Goa or pristine serene backwaters in Kerala and South Goa, here are authentic guest-verified stays:`,
        recommendedHotels: matched,
      };
    }

    // Mountain / Himalayas / Nature / Wellness
    if (q.includes('mountain') || q.includes('himalaya') || q.includes('retreat') || q.includes('wellness') || q.includes('spa') || q.includes('rishikesh') || q.includes('hill')) {
      const matched = hotels.filter((h) => 
        h.categories.includes('Mountain Retreat') || 
        h.categories.includes('Wellness & Spa') ||
        h.location.state === 'Uttarakhand' ||
        h.location.state === 'Himachal Pradesh'
      ).slice(0, 3);

      return {
        text: `For rejuvenating mountain air, authentic Ayurvedic therapies, and serene Himalayan vistas, here are top-tier verified properties:`,
        recommendedHotels: matched,
      };
    }

    // Budget / Value for Money
    if (q.includes('budget') || q.includes('cheap') || q.includes('affordable') || q.includes('value') || q.includes('15000') || q.includes('10000') || q.includes('5000')) {
      const matched = hotels.filter((h) => h.priceTier === '₹' || h.priceTier === '₹₹' || h.ratings.value >= 4.5).slice(0, 3);
      return {
        text: `Here are verified Indian stays that deliver exceptional hospitality and comfort without excessive luxury premiums:`,
        recommendedHotels: matched.length > 0 ? matched : hotels.slice(0, 2),
      };
    }

    // Default matching search by general terms
    const matched = hotels.filter((h) => 
      h.name.toLowerCase().includes(q) || 
      h.location.city.toLowerCase().includes(q) || 
      h.location.state.toLowerCase().includes(q) ||
      h.categories.some((c) => c.toLowerCase().includes(q))
    ).slice(0, 3);

    if (matched.length > 0) {
      return {
        text: `I found ${matched.length} verified stays matching your inquiry:`,
        recommendedHotels: matched,
      };
    }

    return {
      text: `Here are our highest-rated benchmark stays across India known for authentic hospitality, verified reviews, and transparent reality checks:`,
      recommendedHotels: hotels.slice(0, 2),
      suggestedActions: [
        { label: '🔍 Browse All Stays', action: () => { setIsOpen(false); navigateTo('explore'); } },
        { label: '🏆 View Top Rankings', action: () => { setIsOpen(false); navigateTo('rankings'); } },
      ]
    };
  };

  const processUserMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Check if user has a configured Gemini API Key
    if (activeApiKey) {
      try {
        const hotelContext = hotels.map(h => ({
          name: h.name,
          slug: h.slug,
          city: h.location.city,
          state: h.location.state,
          rating: h.ratings.overall,
          priceTier: h.priceTier,
          priceRange: h.priceRangeText,
          categories: h.categories,
          positives: h.realityCheck.positives,
          drawbacks: h.realityCheck.drawbacks,
          verdict: h.editorialVerdict
        }));

        const prompt = `You are the AI Concierge for "IndiaHotelReviews" (IHR), an honest, editorial, verified review platform for Indian hotels.
Always provide candid, helpful, nuanced advice with Indian hospitality context. Keep responses concise, well-structured with bullet points and Rupee (₹) pricing conventions.

Knowledge base of available hotels:
${JSON.stringify(hotelContext, null, 2)}

User query: "${userText}"`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          
          // Match relevant hotel cards if mentioned
          const relevantHotels = hotels.filter(h => 
            aiResponseText.toLowerCase().includes(h.name.toLowerCase()) || 
            userText.toLowerCase().includes(h.name.toLowerCase()) ||
            userText.toLowerCase().includes(h.location.city.toLowerCase())
          ).slice(0, 3);

          setMessages((prev) => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: 'assistant',
              text: aiResponseText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              recommendedHotels: relevantHotels.length > 0 ? relevantHotels : undefined,
            },
          ]);
          setIsTyping(false);
          return;
        }
      } catch {
        // Fallback to offline engine
      }
    }

    // Offline simulation delay for natural feel
    setTimeout(() => {
      const response = generateOfflineResponse(userText);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedHotels: response.recommendedHotels,
          suggestedActions: response.suggestedActions,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-neutral-950 text-white rounded-full shadow-modal hover:shadow-elevated hover:bg-neutral-800 transition-all duration-300 active:scale-95 border border-neutral-800"
            aria-label="Open AI Concierge Chat"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
              Ask AI Stay Concierge
            </span>
            <span className="text-xs font-bold uppercase tracking-wider sm:hidden">
              AI Concierge
            </span>
          </button>
        )}
      </div>

      {/* Slide-out / Popup Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[420px] max-h-[600px] h-[85vh] bg-white rounded-2xl border border-neutral-300 shadow-modal flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold tracking-wide">India Stay Concierge</h3>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono rounded border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono">
                  {activeApiKey ? 'Powered by Google Gemini' : 'Editorial Stay Intelligence'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowApiKeyModal(true)}
                className={`p-1.5 rounded text-xs transition-colors ${
                  activeApiKey ? 'text-emerald-400 hover:text-emerald-300' : 'text-neutral-400 hover:text-white'
                }`}
                title="Configure Gemini API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
                title="Clear Conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Banner if on HotelDetailPage */}
          {currentHotel && (
            <div className="px-3.5 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-neutral-700 truncate">
                <Compass className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate">Viewing: <strong>{currentHotel.name}</strong></span>
              </div>
              <button
                onClick={() => handleSendPreset(`What are the real drawbacks and catches of ${currentHotel.name}?`)}
                className="text-neutral-950 font-bold hover:underline shrink-0 text-[10px] uppercase tracking-wider"
              >
                Check Drawbacks
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50/50 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed shadow-subtle ${
                    msg.sender === 'user'
                      ? 'bg-neutral-950 text-white rounded-br-xs'
                      : 'bg-white text-neutral-900 border border-neutral-200 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-normal text-xs sm:text-xs leading-relaxed">
                    {msg.text}
                  </p>

                  {/* Embedded Recommended Hotel Cards */}
                  {msg.recommendedHotels && msg.recommendedHotels.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-neutral-100">
                      {msg.recommendedHotels.map((hotel) => (
                        <div
                          key={hotel.id}
                          className="bg-neutral-50 hover:bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 transition-colors flex items-center gap-2.5 text-left"
                        >
                          <img
                            src={hotel.heroImage}
                            alt={hotel.name}
                            className="w-14 h-14 rounded-lg object-cover shrink-0 border border-neutral-300"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-neutral-950 truncate text-xs">
                              {hotel.name}
                            </h4>
                            <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{hotel.location.city}, {hotel.location.state}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-mono text-[10px] font-bold text-neutral-900">
                                {hotel.priceTier} · {hotel.priceRangeText.split('–')[0]}
                              </span>
                              <div className="flex items-center gap-0.5 text-[10px] font-bold bg-neutral-900 text-white px-1.5 py-0.2 rounded">
                                <Star className="w-2.5 h-2.5 fill-white" />
                                <span>{hotel.ratings.overall.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigateTo('hotel-detail', hotel.slug);
                            }}
                            className="p-1.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors shrink-0"
                            title="View hotel profile"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Quick Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                      {msg.suggestedActions.map((act, i) => (
                        <button
                          key={i}
                          onClick={act.action}
                          className="text-[10px] font-medium px-2.5 py-1 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-full border border-neutral-200 transition-colors"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-neutral-400 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white border border-neutral-200 rounded-2xl rounded-bl-xs w-20 shadow-subtle">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about hotels, drawbacks, pricing, safety..."
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:border-neutral-950 bg-neutral-50 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-neutral-950 text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-950 transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Gemini API Key Configuration Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-neutral-300 max-w-md w-full p-6 shadow-modal space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-neutral-900" />
                <h3 className="font-serif text-lg font-bold text-neutral-950">
                  Google Gemini API Key
                </h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Add your free <strong>Google Gemini API key</strong> for real-time natural language answers, personalized hotel matching, and custom itinerary suggestions.
            </p>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-neutral-950"
              />
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-neutral-900">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
                <span>How to get a key?</span>
              </div>
              <p>
                Get your key at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-950 underline font-semibold"
                >
                  Google AI Studio
                </a>{' '}
                (100% free tier available).
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput('');
                  localStorage.removeItem('ihr_gemini_api_key');
                  setActiveApiKey('');
                  setShowApiKeyModal(false);
                }}
                className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                Reset / Clear Key
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-5 py-2 bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
