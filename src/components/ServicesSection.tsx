import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { serviceCategories } from '../data/services';
import { Scissors, Sparkles, Heart, Hand, Flower, Gift, Search, Clock, Check, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors: Scissors,
  Sparkles: Sparkles,
  Heart: Heart,
  Hand: Hand,
  Flower: Flower,
  Gift: Gift
};

interface ServicesSectionProps {
  onBookClick: (prefilledService?: string) => void;
}

export default function ServicesSection({ onBookClick }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('hair');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon renderer helper
  const renderCategoryIcon = (iconName: string, className?: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Filter services by category or search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return serviceCategories.filter(cat => cat.id === selectedCategory);
    }
    
    // If search query exists, look everywhere
    return serviceCategories.map(category => {
      const matchedServices = category.services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...category,
        services: matchedServices
      };
    }).filter(category => category.services.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Absolute vectors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-pink/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-gold uppercase font-bold font-sans">Premium Service Menu</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight leading-tight">
            Indulge in <span className="italic">Elite</span> Self-Care Services
          </h3>
          <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
            Every treatment at Elgo Glamour World is a sensory escape. We select only professional, clinically authorized solutions to elevate your hair texture, dermal radiance, and makeup confidence.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Hydra Facial, Keratin, Makeup)..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-xs placeholder:text-gray-400 font-sans shadow-inner"
              id="service-search-input"
            />
          </div>
        </div>

        {/* Category Tab Controls - Hidden when search is active to reduce visual noise */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-12" id="service-category-tabs">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'gold-gradient text-white shadow-md'
                    : 'bg-luxury-bg hover:bg-gray-100 text-luxury-dark border border-gray-200'
                }`}
              >
                {renderCategoryIcon(category.iconName, 'w-3.5 h-3.5')}
                <span>{category.name.split(' & ')[0]}</span>
              </button>
            ))}
          </div>
        )}

        {/* Services List Display */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Category Header when searching */}
                {searchQuery && (
                  <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                    <span className="p-2 bg-rose-50 text-rosegold rounded-xl">
                      {renderCategoryIcon(category.iconName, 'w-5 h-5')}
                    </span>
                    <h4 className="font-serif font-semibold text-lg text-luxury-dark">{category.name}</h4>
                  </div>
                )}

                {/* Grid layout for services in this category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="group bg-luxury-bg/50 hover:bg-white p-6 rounded-3xl border border-gray-200 hover:border-gold/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Title and price bar */}
                        <div className="flex justify-between items-start gap-4">
                          <h5 className="font-serif font-semibold text-sm sm:text-base text-luxury-dark group-hover:text-gold transition-colors duration-200">
                            {service.name}
                            {service.isPopular && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#F7D7E3] text-[#B76E79] uppercase tracking-widest">
                                Popular
                              </span>
                            )}
                          </h5>
                          <span className="font-sans font-bold text-sm sm:text-base text-gold shrink-0">
                            {service.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 font-light text-xs leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Footer: duration and booking */}
                      <div className="flex items-center justify-between border-t border-gray-100/50 pt-4 mt-5">
                        {service.duration && (
                          <div className="flex items-center space-x-1.5 text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-sans tracking-wide">{service.duration}</span>
                          </div>
                        )}
                        <button
                          onClick={() => onBookClick(service.name)}
                          className="text-[11px] font-bold uppercase tracking-widest text-rosegold hover:text-gold flex items-center space-x-1 transition-all duration-200 cursor-pointer"
                        >
                          <span>Request Slot</span>
                          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No services found matching "{searchQuery}". Try searching for something else.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-gold/5 via-[#FAF8F5] to-rosegold/5 border border-gold/20 rounded-[2rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-luxury-dark">Not Sure Which Treatment Fits Your Skin or Hair?</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Schedule a completely free, 15-minute customized beauty consultation with our senior specialists. We will analyze your texture and recommend the perfect path.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onBookClick('Free Beauty Consultation')}
                className="gold-gradient text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
                id="service-consultation-cta"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
          {/* Subtle background circle patterns */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/40 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/40 rounded-full blur-xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
