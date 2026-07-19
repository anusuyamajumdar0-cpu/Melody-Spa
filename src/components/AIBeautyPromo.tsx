import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MessageSquare, ArrowRight, MessageCircle, Phone, Award, ShieldCheck, Heart } from 'lucide-react';
import bengaliBridalLookImg from '../assets/images/bengali_bridal_makeup_1784447943663.jpg';
import OptimizedImage from './OptimizedImage';

interface AIBeautyPromoProps {
  onTryAIClick: () => void;
  onBookClick: () => void;
}

export default function AIBeautyPromo({ onTryAIClick, onBookClick }: AIBeautyPromoProps) {
  // Particle and floating elements animation helper
  const floatAnimation = (delay: number, yDistance = -15) => ({
    animate: {
      y: [0, yDistance, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: delay,
      }
    }
  });

  return (
    <section 
      id="ai-promo-section"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1B1B1B] via-[#2D2225] to-[#121212] text-white"
    >
      {/* Decorative full-bleed glassmorphic radial gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#B76E79]/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-gold/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 pointer-events-none" />

      {/* Floating Animated Beauty Icons / Particles */}
      <motion.div 
        variants={floatAnimation(0, -12)}
        animate="animate"
        className="absolute top-[15%] left-[5%] text-gold/20 hidden lg:block"
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>

      <motion.div 
        variants={floatAnimation(2, -18)}
        animate="animate"
        className="absolute bottom-[20%] right-[8%] text-[#B76E79]/20 hidden lg:block"
      >
        <Sparkles className="w-20 h-20" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: GORGEOUS GRAPHICAL AI PREVIEW (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Holographic Glowing card */}
            <div className="relative aspect-[4/4.5] sm:aspect-[1.1] lg:aspect-[4/4.5] bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 shadow-2xl overflow-hidden flex flex-col justify-between group">
              {/* Spinning circular luxury grid behind */}
              <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full border border-gold/10 animate-spin [animation-duration:20s]" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-[#B76E79]/10 animate-spin [animation-duration:35s]" />

              {/* Glowing face scanning mockup */}
              <div className="relative w-full h-[65%] rounded-3xl overflow-hidden border border-white/5 shadow-inner">
                <OptimizedImage 
                  src={bengaliBridalLookImg} 
                  alt="AI Smart Scan" 
                  className="w-full h-full"
                  imgClassName="brightness-95 group-hover:scale-105 transition-transform duration-700" 
                  noCache={false}
                />
                
                {/* Holographic sweeping scan line */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_rgba(212,175,55,1)]"
                />

                {/* Laser nodes mapping face contours */}
                <div className="absolute top-[28%] left-[45%] w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <div className="absolute top-[38%] left-[58%] w-1.5 h-1.5 rounded-full bg-gold animate-ping delay-300" />
                <div className="absolute top-[55%] left-[38%] w-1.5 h-1.5 rounded-full bg-gold animate-ping delay-700" />
                <div className="absolute top-[48%] left-[50%] w-1.5 h-1.5 rounded-full bg-gold animate-ping delay-1000" />
              </div>

              {/* Mock Report details */}
              <div className="space-y-3 bg-white/5 border border-white/10 p-5 rounded-2xl relative z-10">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gold">
                  <span>Gemini Vision Live Analysis</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 text-left space-y-0.5">
                    <span className="text-[9px] text-gray-400 font-medium block">FACE STRUCTURE</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Balanced Oval</span>
                  </div>
                  <div className="flex-1 text-left space-y-0.5">
                    <span className="text-[9px] text-gray-400 font-medium block">BEST HAIR FIT</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Butterfly Layers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accented floating award badges */}
            <motion.div 
              variants={floatAnimation(1, -6)}
              animate="animate"
              className="absolute -top-6 -right-6 bg-gold text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-white/10 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-white" />
              <span>99.4% Match Rate</span>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: DETAILED PROMO TEXT & CTAS (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col space-y-8 text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Exclusive Smart Consultation</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                Discover Your Perfect Look <br />
                with the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-rose-300 to-gold font-light italic">AI</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Upload your selfie and receive a personalized AI beauty consultation, hairstyle recommendations, skincare suggestions, and highly realistic makeover previews before you even book an appointment. Crafted with state-of-the-art Google Gemini Vision.
              </p>
            </div>

            {/* Quick value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-gray-300">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-gold/10 text-gold rounded-full"><ShieldCheck className="w-4 h-4" /></div>
                <span>100% Secure & Privacy Protected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-gold/10 text-gold rounded-full"><Heart className="w-4 h-4" /></div>
                <span>Flattering, Encouraging Reports Only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-gold/10 text-gold rounded-full"><Award className="w-4 h-4" /></div>
                <span>Bengali Bridal & Luxury Styling Rules</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 bg-gold/10 text-gold rounded-full"><Sparkles className="w-4 h-4" /></div>
                <span>Try On Hairstyles & Colors Instantly</span>
              </div>
            </div>

            {/* CTA BUTTONS block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onTryAIClick}
                className="gold-gradient text-[#1B1B1B] text-xs sm:text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-xl cursor-pointer shadow-xl shadow-gold/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span>✨ Try AI Beauty Consultant</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-gold hover:bg-white/5 text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Book Appointment</span>
              </button>

              <a
                href="https://wa.me/917980874963?text=Hi%20Melody's%20Spa%20and%20Family%20Salon!%20I'd%20like%20to%20know%20more%20about%20your%20AI%20Beauty%20Consultant%20experience."
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-xl transition-all duration-300"
              >
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  <Phone className="w-2.5 h-2.5 text-white absolute fill-white stroke-[3.5] rotate-[15deg] translate-y-[-0.5px] translate-x-[-0.2px]" />
                </div>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
