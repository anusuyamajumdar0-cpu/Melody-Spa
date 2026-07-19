import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from './components/SEO';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicesSection from './components/ServicesSection';
import AIBeautyPromo from './components/AIBeautyPromo';
import AIConsultantStudio from './components/AIConsultantStudio';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // Elegant luxury page load simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleBookAppointment = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    }
    setIsBookingModalOpen(true);
  };

  const handleClearPrefill = () => {
    setPrefilledService('');
  };

  return (
    <>
      {/* 1. SEO Structured tags and dynamically injected Head tags */}
      <SEO />

      {/* 2. Elegant Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative flex flex-col items-center">
              {/* Spinning subtle circular gold border */}
              <div className="w-24 h-24 rounded-full border-2 border-gold/15 border-t-gold animate-spin" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <span className="block font-display text-lg tracking-[0.25em] text-luxury-dark font-bold">
                MELODY'S SPA & FAMILY SALON
              </span>
              <span className="block text-[8px] tracking-[0.4em] text-rosegold uppercase font-sans font-semibold">
                Spa & Family Salon • Garia
              </span>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-light animate-pulse">
              Sanitizing workstations... Loading elegance
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Primary Page Assembly */}
      <div className="relative min-h-screen bg-white overflow-hidden text-luxury-dark selection:bg-soft-pink selection:text-luxury-dark antialiased">
        
        {/* Transparent Sticky Navigation */}
        <Header onBookClick={() => handleBookAppointment()} />

        {/* Hero Showcase with visual badges */}
        <Hero onBookClick={() => handleBookAppointment()} />

        {/* Home Promo Hero block for AI Beauty Consultant */}
        <AIBeautyPromo 
          onTryAIClick={() => {
            const el = document.getElementById('ai-consultant');
            if (el) {
              const headerElement = document.getElementById('main-navigation-header');
              const headerHeight = headerElement ? headerElement.offsetHeight : 80;
              const elementPosition = el.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerHeight;
              
              try {
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              } catch (err) {
                window.scrollTo(0, offsetPosition);
              }
            }
          }}
          onBookClick={() => handleBookAppointment()}
        />

        {/* Narrative & Story Details (Tabbed UI) */}
        <About />

        {/* Core Menu, Category filters, Search bar */}
        <ServicesSection onBookClick={handleBookAppointment} />

        {/* Advanced Immersive AI Makeover Studio (Gemini Powered) */}
        <AIConsultantStudio onBookClick={handleBookAppointment} />

        {/* Drag Comparison Slider & Photo Masonry Portfolio */}
        <GallerySection />

        {/* Verified Review Slider */}
        <Testimonials />

        {/* Guides, Tips, & Expandable Modals */}
        <BlogSection />

        {/* 20 Segmented Accordion FAQs */}
        <FAQSection />

        {/* Schedule Form (Pre-filled hook) & NAP contact mapping */}
        <Contact 
          prefilledService={prefilledService} 
          onClearPrefill={handleClearPrefill} 
        />

        {/* Polished local SEO footer & copyright credits */}
        <Footer onBookClick={() => handleBookAppointment()} />

        {/* Floating WhatsApp Quick Response Widget */}
        <Chatbot />

        {/* 4. Elegant Interactive Booking Modal Overlay */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] z-10 border border-gold/15"
              >
                <BookingForm
                  prefilledService={prefilledService}
                  onClearPrefill={handleClearPrefill}
                  onClose={() => setIsBookingModalOpen(false)}
                  isModal={true}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

