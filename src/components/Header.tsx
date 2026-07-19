import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Phone } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setIsScrolled(window.scrollY > 50);

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: '✨ AI Beauty Consultant', href: '#ai-consultant', isNew: true },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const wasMobileMenuOpen = isMobileMenuOpen;
      
      setIsMobileMenuOpen(false);

      const scrollAction = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerElement = document.getElementById('main-navigation-header');
          const headerHeight = headerElement ? headerElement.offsetHeight : 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
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
      };

      if (wasMobileMenuOpen) {
        // Wait for mobile menu collapsing transition to stabilize layout height
        setTimeout(scrollAction, 150);
      } else {
        scrollAction();
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-gold via-rosegold to-gold z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-[#FAF8F5]/80 backdrop-blur-md shadow-md border-b border-gold/10' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Elegant Luxury Logo */}
            <a 
              href="#" 
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group" 
              id="brand-logo"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-gold rounded-full flex items-center justify-center font-serif text-lg sm:text-xl font-bold text-gold group-hover:bg-gold/5 transition-colors">M</div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight uppercase text-luxury-dark group-hover:text-gold transition-colors duration-300">
                  MELODY'S <span className="text-gold">SPA & SALON</span>
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-rosegold uppercase font-sans font-semibold -mt-1 pl-0.5">
                  Spa & Family Salon • Garia
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav-menu">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-xs uppercase tracking-wider font-medium text-luxury-dark hover:text-gold transition-all duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1.5"
                >
                  <span>{item.name}</span>
                  {item.isNew && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="tel:+917980874963"
                className="flex items-center space-x-1.5 text-xs font-semibold tracking-wider text-luxury-dark hover:text-rosegold transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-rosegold" />
                <span>+91 79808 74963</span>
              </a>
              <button
                onClick={onBookClick}
                className="btn-gold-gradient text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer flex items-center space-x-1.5"
                id="header-booking-cta"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Salon Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-luxury-dark hover:text-gold focus:outline-none p-1.5"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100"
            >
              <div className="px-4 pt-3 pb-6 space-y-3 shadow-inner">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between font-sans text-sm uppercase tracking-wider font-semibold text-luxury-dark hover:text-gold px-3 py-2 rounded-md hover:bg-luxury-bg transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.isNew && (
                      <span className="px-2.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full animate-pulse uppercase tracking-widest">
                        New
                      </span>
                    )}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 px-3">
                  <a
                    href="tel:+917980874963"
                    className="flex items-center justify-center space-x-2 text-sm font-semibold text-luxury-dark py-2.5 rounded-md border border-gray-200"
                  >
                    <Phone className="w-4 h-4 text-rosegold" />
                    <span>Call: +91 79808 74963</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onBookClick();
                    }}
                    className="btn-gold-gradient w-full text-xs font-semibold uppercase tracking-wider py-3 rounded-full flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
