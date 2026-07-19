import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../data/faqs';
import { ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General / Hygiene' },
    { id: 'hair', label: 'Hair Botox & Keratin' },
    { id: 'skin', label: 'Facials & Dermis' },
    { id: 'bridal', label: 'Bridal Makeovers' },
    { id: 'nails', label: 'Nail Art' },
    { id: 'booking', label: 'Bookings' }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vector */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#B76E79]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-gold uppercase font-bold font-sans">Curious Clients</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight">
            Commonly Asked <span className="italic">Questions</span>
          </h3>
          <p className="text-gray-500 font-light text-sm">
            Everything you need to know about our premium brands, autoclaved tools, bridal bookings, and directions near Durganagar Station, Kolkata.
          </p>

          {/* Interactive Search inside FAQ */}
          <div className="relative max-w-md mx-auto mt-6">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g. hygiene, parking, Mac)..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-gold text-xs"
              id="faq-search-input"
            />
          </div>
        </div>

        {/* Category pills for sorting */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10" id="faq-category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-gold bg-gold text-white shadow-xs'
                    : 'border-gray-200 bg-white text-gray-500 hover:text-luxury-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List expandable accordions */}
        <div className="space-y-4" id="faq-accordions">
          {filteredFaqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#FAF8F5]/80 hover:bg-white border border-gray-150 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <h4 className="font-serif font-medium text-xs sm:text-sm text-luxury-dark leading-snug">
                    {faq.question}
                  </h4>
                  <span className="shrink-0 p-1 bg-white rounded-lg border border-gray-100 text-gray-400 group-hover:text-gold">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-gray-100/50 text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs">
              No matching questions found for "{searchQuery}". Try a different keyword.
            </div>
          )}
        </div>

        {/* SEO FAQ Schema Tagging representation */}
        <div className="mt-12 bg-amber-50/40 border border-amber-100 p-4 rounded-2xl flex items-center gap-2.5 max-w-xl mx-auto">
          <Sparkles className="w-4.5 h-4.5 text-gold shrink-0" />
          <p className="text-[10px] text-gray-500 font-sans">
            ⚡ Structured FAQs are tagged with official <strong>Schema.org JSON-LD structured data</strong> to accelerate Google Local and Voice search rankings.
          </p>
        </div>

      </div>
    </section>
  );
}
