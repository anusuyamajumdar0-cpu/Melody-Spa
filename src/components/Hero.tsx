import { motion } from 'motion/react';
import { Star, ArrowRight, MessageCircle, ShieldCheck, Heart, Phone, Sparkles } from 'lucide-react';
import heroBengaliBeautyImg from '../assets/images/hero_salon_interior_1784447901269.jpg';
import OptimizedImage from './OptimizedImage';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  // Staggered child animation definitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotate: -1 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const floatingSparkleVariants = (delay: number) => ({
    animate: {
      y: [0, -12, 0],
      rotate: [0, 15, -15, 0],
      scale: [1, 1.15, 0.9, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: delay,
      }
    }
  });

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-b from-[#FAF8F5] via-[#FFFDFB] to-white overflow-hidden"
    >
      {/* Background abstract aesthetic shapes with deep radial pulses */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.2, 0.3, 0.25, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[550px] h-[550px] bg-soft-pink/25 rounded-full blur-[130px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{
          scale: [1, 0.9, 1.05, 1],
          opacity: [0.05, 0.1, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gold/10 rounded-full blur-[90px] pointer-events-none -z-10" 
      />

      {/* Floating Sparkles for cool GenZ magic glow */}
      <motion.div
        variants={floatingSparkleVariants(0)}
        animate="animate"
        className="absolute top-[20%] left-[8%] text-gold/35 pointer-events-none -z-5 hidden sm:block"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        variants={floatingSparkleVariants(1.5)}
        animate="animate"
        className="absolute bottom-[25%] right-[12%] text-[#B76E79]/30 pointer-events-none -z-5 hidden sm:block"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
      <motion.div
        variants={floatingSparkleVariants(3)}
        animate="animate"
        className="absolute top-[15%] right-[45%] text-gold/25 pointer-events-none -z-5 hidden sm:block"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text copy */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-8 text-left z-10"
          >
            {/* Semantic H1 for SEO, styled with absolute elegance */}
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#F7D7E3] text-[#B76E79] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xs hover:scale-105 transition-transform duration-200 cursor-default">
                  Award-Winning Salon
                </span>
                <div className="flex items-center text-yellow-500 bg-white/60 backdrop-blur-xs px-3 py-1 rounded-full border border-gray-100 shadow-2xs">
                  <span className="text-sm font-bold mr-1">4.8</span>
                  <span className="text-xs">★★★★★ (976+ Reviews)</span>
                </div>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants} 
                className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[0.95] text-[#1B1B1B] tracking-tight"
              >
                Discover <motion.span 
                  className="italic inline-block font-light text-luxury-dark"
                  whileHover={{ scale: 1.05, rotate: -1.5, color: "#B76E79" }}
                  transition={{ type: "spring", stiffness: 350, damping: 10 }}
                >Luxury</motion.span> <br/>Beauty <motion.span 
                  className="text-gold inline-block font-medium"
                  whileHover={{ scale: 1.05, rotate: 1, color: "#1B1B1B" }}
                  transition={{ type: "spring", stiffness: 350, damping: 10 }}
                >Reimagined</motion.span>
              </motion.h2>
            </div>

            {/* Subtitle / Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl font-light"
            >
              Experience advanced hair styling, glowing skincare, and exquisite bridal makeovers in Garia's most prestigious sanctuary. Delivered by experienced professionals in a welcoming, hygienic, and modern salon.
            </motion.p>

            {/* Trust / Proof Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              {/* Women Owned Badge */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-1.5 bg-rose-50 border border-rose-100 px-3.5 py-2 rounded-full text-xs font-medium text-rosegold cursor-default shadow-2xs transition-shadow duration-300 hover:shadow-md hover:shadow-rose-100/40"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rosegold" />
                <span>Women-Owned & Empowered</span>
              </motion.div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <motion.button
                onClick={onBookClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="gold-gradient text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-xl cursor-pointer shadow-xl shadow-gold/30 flex items-center justify-center gap-3 group relative overflow-hidden"
                id="hero-primary-cta"
              >
                {/* Micro-sparkle shine sweep effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine" />
                <span>Book Your Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="https://wa.me/917980874963?text=Hi%20Melody's%20Spa%20and%20Family%20Salon!%20I%20found%20your%20website%20and%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/10 text-[#1B1B1B] font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all duration-300 bg-white shadow-sm hover:shadow-lg hover:shadow-emerald-500/5"
                id="hero-whatsapp-cta"
              >
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  <Phone className="w-2.5 h-2.5 text-white absolute fill-white stroke-[3.5] rotate-[15deg] translate-y-[-0.5px] translate-x-[-0.2px]" />
                </div>
                <span>Chat on WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Local Landmarks micro keywords for SEO */}
            <motion.p 
              variants={itemVariants}
              className="text-[10px] text-gray-400 font-sans tracking-wide"
            >
              📍 Premium Luxury Salon in Garia | Best Family Salon near Garia Station & Kavi Nazrul Metro
            </motion.p>
          </motion.div>

          {/* Hero Right Column: Visual Geometric Layout with cool hover effects */}
          <motion.div 
            initial={{ opacity: 0, x: 40, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md lg:max-w-none mx-auto"
          >
            {/* Hero Main Image Card with subtle interactive motion */}
            <motion.div 
              whileHover={{ 
                y: -6, 
                rotate: 0.5,
                scale: 1.01,
                boxShadow: "0 25px 50px -12px rgba(183, 110, 121, 0.15)"
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="relative aspect-[4/3] sm:aspect-[1.4] lg:aspect-[4/3.5] bg-gray-100 rounded-[40px] overflow-hidden group border border-gold/10 shadow-lg cursor-default"
            >
              <OptimizedImage 
                src={heroBengaliBeautyImg} 
                alt="Melody's Spa & Family Salon Sanctuary" 
                className="absolute inset-0 w-full h-full"
                imgClassName="opacity-90 transition-transform duration-700 group-hover:scale-105"
                noCache={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white text-left">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 text-gold">Our Modern Sanctuary</div>
                <div className="font-serif text-2xl">Melody's Spa & Family Salon</div>
                <p className="text-xs text-gray-300 mt-1 font-light">Custom hair care, advanced facials, and bridal makeovers near you.</p>
              </div>

              {/* Badges layered elegantly inside */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-[10px] font-bold text-luxury-dark tracking-wider flex items-center gap-1.5 border border-gold/15 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>✨ 100% Sanitized</span>
              </motion.div>
            </motion.div>

            {/* Bottom mini metric grids with physics-based hover bounds */}
            <div className="flex gap-6">
              <motion.div 
                whileHover={{ y: -4, scale: 1.03, borderColor: "rgba(212, 175, 55, 0.6)" }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex-1 bg-white rounded-3xl p-6 flex flex-col justify-center items-start text-left border border-gold/20 shadow-lg relative overflow-hidden group transition-colors cursor-default"
              >
                <span className="text-4xl font-serif text-gold font-bold">97%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">Client Satisfaction</span>
                <div className="absolute -right-4 -bottom-4 text-gold/5 font-serif text-7xl select-none pointer-events-none font-bold group-hover:text-gold/10 group-hover:scale-110 transition-all duration-300">97</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -4, scale: 1.03, backgroundColor: "#222222" }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex-1 bg-[#1B1B1B] rounded-3xl p-6 flex flex-col justify-center items-start text-left text-white relative overflow-hidden group cursor-default shadow-lg"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#B76E79] mb-1">Empowered</div>
                <div className="text-xs leading-normal font-light text-gray-300">Proudly Women-Owned & Inclusive</div>
                <div className="absolute -right-4 -bottom-4 opacity-10 text-[#B76E79] group-hover:opacity-20 group-hover:scale-110 transition-all duration-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

