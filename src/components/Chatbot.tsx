import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, MessageCircle, Phone } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: "👋 Welcome to Melody's Spa & Family Salon! How can we help you today?" }
  ]);

  const quickReplies = [
    { label: 'Book Appointment', text: 'Hi Melody\'s Spa and Family Salon! I found your website and would like to book an appointment.' },
    { label: 'Bridal Makeup', text: 'Hi Melody\'s Spa and Family Salon! I am interested in your luxury HD and Airbrush Bridal Makeup packages.' },
    { label: 'Hair Services', text: 'Hi Melody\'s Spa and Family Salon! I would like to get details about your Hair Botox and Keratin treatments.' },
    { label: 'Skin Care', text: 'Hi Melody\'s Spa and Family Salon! Tell me more about your advanced Hydra Facial (7-in-1) and skin therapies.' },
    { label: 'Pricing', text: 'Hi Melody\'s Spa and Family Salon! Please share your full price list for premium hair and skin packages.' },
    { label: 'Talk to Expert', text: 'Hi Melody\'s Spa and Family Salon! I would like a free beauty consultation with your senior stylist.' },
    { label: 'Location', text: 'Hi Melody\'s Spa and Family Salon! Can you guide me on the directions to your salon near Garia Station?' },
    { label: 'Offers', text: 'Hi Melody\'s Spa and Family Salon! What are your current seasonal discounts and membership offers?' }
  ];

  const handleQuickReply = (label: string, text: string) => {
    // 1. Append user's choice to simulated chat
    setMessages(prev => [...prev, { sender: 'user', text: label }]);
    
    // 2. Delay slightly for visual satisfaction, then open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/917980874963?text=${encodeURIComponent(text)}`, '_blank', 'noreferrer');
    }, 4000);
  };

  return (
    <>
      {/* Floating pulsing WhatsApp badge button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 focus:outline-none cursor-pointer hover:shadow-emerald-500/25"
          id="whatsapp-chatbot-bubble"
          aria-label="Open Chat Desk"
        >
          {/* Animated pulsing outer ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10" />
          
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative w-7 h-7 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 fill-white text-white" />
              <Phone className="w-3 h-3 text-emerald-500 absolute fill-emerald-500 stroke-[3.5] rotate-[15deg] translate-y-[-0.5px] translate-x-[-0.2px]" />
            </div>
          )}
          
          {/* Unread dot notification badge */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full animate-bounce" />
          )}
        </button>
      </div>

      {/* Mini Conversation Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] max-h-[500px] bg-white rounded-[2rem] shadow-2xl border border-gray-150 flex flex-col overflow-hidden z-50"
            id="whatsapp-chat-drawer"
          >
            {/* Header branding */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-sm">
                    MS
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-xs tracking-wide">Melody's Spa Desk</h4>
                  <p className="text-[10px] text-emerald-100 font-sans">Replies in under 1 minute</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 max-h-[220px]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-light leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-white font-medium rounded-tr-none'
                        : 'bg-white text-luxury-dark border border-gray-100 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Chat Response Alert */}
            {messages.length > 1 && (
              <div className="px-4 py-2 bg-amber-50 border-t border-b border-amber-100 text-[10px] text-amber-800 font-sans flex items-center gap-1.5 animate-pulse">
                <span>🔄 Connecting securely... opening WhatsApp in a moment.</span>
              </div>
            )}

            {/* Quick replies block */}
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              <span className="block text-[9px] font-sans font-bold uppercase tracking-wider text-gray-400 text-left">
                Select a Quick Reply
              </span>
              
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    onClick={() => handleQuickReply(reply.label, reply.text)}
                    disabled={messages.length > 1}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-full text-[10px] font-medium text-gray-600 hover:text-emerald-700 transition-colors cursor-pointer text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal disclaimer */}
            <div className="p-2 bg-gray-50 border-t border-gray-100 text-[8px] text-gray-400 text-center uppercase tracking-wider font-sans">
              🔒 Powered by WhatsApp Secure API
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
