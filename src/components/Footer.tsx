import { Facebook, Instagram, Phone, MapPin, Mail, Clock, Heart, Award } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const quickLinks = [
    { name: "About Melody's", href: '#about' },
    { name: 'Salon Services', href: '#services' },
    { name: 'Transformations', href: '#gallery' },
    { name: 'Client Reviews', href: '#testimonials' },
    { name: 'Editorial Blog', href: '#blog' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Get Directions', href: '#contact' }
  ];

  const serviceLinks = [
    { name: 'Hair Botox & Smoothening', href: '#services' },
    { name: '7-in-1 Hydra Facial', href: '#services' },
    { name: 'HD Bridal Makeovers', href: '#services' },
    { name: 'Gel Nail Art & Extensions', href: '#services' },
    { name: 'Aromatherapy Body Spa', href: '#services' },
    { name: 'Pre-Bridal Packages', href: '#services' }
  ];

  return (
    <footer id="main-application-footer" className="bg-luxury-dark text-white pt-20 pb-8 relative overflow-hidden border-t border-white/5">
      
      {/* Footer Top Call To Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold font-sans flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4 text-gold" />
              Luxury Beauty Awaits You
            </span>
            <h4 className="font-serif text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Ready for Your Next <span className="italic">Beauty Transformation?</span>
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Visit Melody's Spa & Family Salon today and discover premium beauty and spa services tailored to your unique style. Schedule your appointment online or chat with our beauty experts on WhatsApp for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="gold-gradient text-white w-full sm:w-auto text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer shadow-lg shadow-gold/20 hover:scale-105 transition-transform"
              >
                Book My Appointment
              </button>
              <a
                href="tel:+917980874963"
                className="w-full sm:w-auto border border-white/20 hover:border-white hover:bg-white/5 py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-rosegold" />
                <span>Call: +91 79808 74963</span>
              </a>
            </div>
          </div>
          {/* Background blurred sphere elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-rosegold/10 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        
        {/* Brand Information & Local SEO summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl font-bold tracking-widest text-white">MELODY'S SPA & FAMILY SALON</span>
            <span className="text-[9px] tracking-[0.35em] text-rosegold uppercase font-sans font-medium">Spa & Family Salon • Garia</span>
          </div>

          {/* Meticulous Local SEO keyword weave (completely organic in design) */}
          <p className="text-gray-400 text-[11px] leading-relaxed font-light">
            Melody's Spa & Family Salon is the premier <strong className="text-white font-medium">Family Salon & Spa in Garia</strong>, providing exceptional outcomes. Renowned as the <strong className="text-white font-medium">Best Beauty Parlour & Spa in Garia, Kolkata</strong>, our experts specialize in customized <strong className="text-white font-medium">Hair Spas and Massages in Garia</strong>, organic hair treatments, and unisex styling. As Kolkata’s trusted makeup experts, we provide camera-ready bridal/groom makeups and advanced skin brightening <strong className="text-white font-medium">Hydra Facials in Garia</strong>. Experience premium salon grooming at the highly recommended <strong className="text-white font-medium">Family Salon near Garia Station</strong> and <strong className="text-white font-medium">Kavi Nazrul Metro</strong>.
          </p>

          <div className="flex space-x-3">
            <a 
              href="https://facebook.com/MelodysSpaFamilySalon" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2 bg-white/5 hover:bg-gold hover:text-white rounded-lg transition-colors text-gray-300"
              aria-label="Follow Melody's on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com/MelodysSpaFamilySalon" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2 bg-white/5 hover:bg-rosegold hover:text-white rounded-lg transition-colors text-gray-300"
              aria-label="Follow Melody's on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sitemap columns */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">Navigation</h5>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-gray-400 hover:text-gold text-xs font-light transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Services columns */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">Elite Services</h5>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-gray-400 hover:text-rosegold text-xs font-light transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* NAP Location block */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-white">Headquarters</h5>
          
          <div className="space-y-3.5 text-xs text-gray-400 font-light">
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 text-rosegold shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                Garia Station Road, beside Garia Station Road Post Office, Garia, Kolkata, West Bengal 700084
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href="tel:+917980874963" className="hover:text-white text-[11px] font-semibold text-white">+91 79808 74963</a>
            </div>

            <div className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-rosegold shrink-0" />
              <a href="mailto:info@melodyspafamilysalon.co.in" className="hover:text-white text-[11px]">info@melodyspafamilysalon.co.in</a>
            </div>

            <div className="flex gap-2 items-start">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p className="text-[11px]">
                Open 7 Days: <span className="text-white font-medium">10:00 AM – 8:30 PM</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer bottom legal credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 font-light space-y-4 md:space-y-0">
        <p>© 2026 MELODY'S SPA & FAMILY SALON. All Rights Reserved. Designed for premium elegance.</p>
        
        <div className="flex items-center space-x-1 uppercase tracking-wider text-[9px]">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-current animate-pulse" />
          <span>in Kolkata for beauty empowerment</span>
        </div>

        <div className="flex space-x-4">
          <a href="#faq" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#faq" className="hover:text-gray-300">Terms of Use</a>
          <a href="#faq" className="hover:text-gray-300">Sitemap</a>
        </div>
      </div>

    </footer>
  );
}
