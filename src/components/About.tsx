import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, ShieldAlert, Heart, Eye, Target, Sparkle } from 'lucide-react';
import bengaliSalonTreatmentImg from '../assets/images/salon_skincare_treatment_1784447930447.jpg';
import OptimizedImage from './OptimizedImage';

export default function About() {
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'vision'>('story');

  const stats = [
    { value: '976+', label: 'Google Reviews', sub: '4.8 Star Rated' },
    { value: '5,000+', label: 'Transformations', sub: 'Flawless Makeovers' },
    { value: '12+', label: 'Elite Specialists', sub: 'Globally Certified' },
    { value: '100%', label: 'Sanitation Score', sub: 'Sterilized Instruments' },
  ];

  const valueProps = [
    {
      title: 'Certified Specialists',
      desc: 'Stylists and therapists trained in international hair, makeup, and skin care techniques.',
      icon: <Award className="w-5 h-5 text-gold" />,
      bg: 'bg-amber-50'
    },
    {
      title: 'Hospital-Grade Hygiene',
      desc: 'Strict sanitization, autoclave tool sterilizers, and single-use disposable kits for ultimate safety.',
      icon: <ShieldAlert className="w-5 h-5 text-rosegold" />,
      bg: 'bg-rose-50'
    },
    {
      title: 'Personalized Consultations',
      desc: 'We never rush. Every hair smoothing or skin peeling treatment starts with a meticulous analysis.',
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      bg: 'bg-amber-50'
    },
    {
      title: 'Premium International Brands',
      desc: 'Mac, Huda Beauty, L’Oréal Professionnel, Schwarzkopf, and O3+ to ensure zero side-effects.',
      icon: <Heart className="w-5 h-5 text-rosegold" />,
      bg: 'bg-rose-50'
    }
  ];

  return (
    <section id="about" className="py-24 bg-luxury-bg relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-soft-pink/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Images Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-md">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400" 
                  alt="Luxury Salon Interior" 
                  aspectRatio="aspect-[3/4]"
                  imgClassName="hover:scale-105 transition-transform duration-500"
                  noCache={false}
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-white p-6 flex flex-col justify-center border border-gray-100 text-center">
                <span className="text-3xl font-display font-bold text-gold">4.8★</span>
                <p className="text-xs text-gray-500 font-sans tracking-wide mt-2">Highest-Rated Salon in Garia, Kolkata</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden shadow-md aspect-square bg-gradient-to-tr from-gold to-rosegold p-6 text-white flex flex-col justify-center text-left">
                <Sparkle className="w-6 h-6 text-white mb-2" />
                <h4 className="font-display font-semibold text-lg">Women-Owned</h4>
                <p className="text-xs text-white/80 mt-1 font-sans font-light">Supporting female empowerment and inclusive self-care daily.</p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md">
                <OptimizedImage 
                  src={bengaliSalonTreatmentImg} 
                  alt="Premium Luxury Salon Hair & Skin Treatments" 
                  aspectRatio="aspect-[3/4]"
                  imgClassName="hover:scale-105 transition-transform duration-500"
                  noCache={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy & Interactive Tabs */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.2em] text-rosegold uppercase font-bold font-sans">Our Identity & Heritage</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight leading-tight">
                Where Beauty Blends with <span className="italic">Pure Elegance</span>
              </h3>
            </div>

            {/* Custom Interactive Tab Controls */}
            <div className="flex border-b border-gray-200">
              {(['story', 'mission', 'vision'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-6 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'border-gold text-gold font-semibold'
                      : 'border-transparent text-gray-400 hover:text-luxury-dark'
                  }`}
                >
                  {tab === 'story' ? 'Our Story' : tab === 'mission' ? 'Our Mission' : 'Our Vision'}
                </button>
              ))}
            </div>

            {/* Tab content renders */}
            <div className="min-h-[220px]">
              {activeTab === 'story' && (
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                  <p>
                    At <strong className="text-luxury-dark font-medium">Melody's Spa & Family Salon</strong>, beauty is more than a service—it’s an experience. Located in Garia, Kolkata, our salon blends creativity, expertise, and premium-quality products to deliver exceptional results for every client.
                  </p>
                  <p>
                    From precision haircuts and advanced hair treatments to glowing skin therapies, luxurious facials, bridal makeovers, nail artistry, and complete beauty packages, our skilled professionals focus on enhancing your natural beauty while ensuring every visit is relaxing, hygienic, and memorable.
                  </p>
                  <p>
                    As a women-owned and inclusive salon, we take pride in creating a welcoming environment where every client receives personalized care, honest consultation, and attention to detail. Our commitment to quality, customer satisfaction, and continuous learning has earned us the trust of hundreds of happy clients and an outstanding reputation in Garia.
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                  <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100">
                    <Target className="w-8 h-8 text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-display font-semibold text-luxury-dark text-base mb-1">Empowering Self-Love & Confidence</h4>
                      <p>
                        Our mission is to offer premium, clinical-grade beauty treatments at accessible price points, ensuring that every woman and client in Kolkata feels confident, radiant, and valued. We combine continuous specialist education with premium international brands to deliver the best results safely.
                      </p>
                    </div>
                  </div>
                  <p className="italic pl-4 border-l-2 border-gold text-gray-500 text-xs">
                    "We do not construct beauty; we simply illuminate the natural elegance already inside you."
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                  <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100">
                    <Eye className="w-8 h-8 text-rosegold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-display font-semibold text-luxury-dark text-base mb-1">Setting the Standard for Clean Luxury</h4>
                      <p>
                        Our vision is to become West Bengal’s benchmark for hygienic, high-end, and inclusive salon care. By adopting advanced dermis technologies, sustainable haircare systems, and autoclave sterilization standards, we are leading a clean beauty revolution in Kolkata.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Value Props list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {valueProps.map((prop, i) => (
                <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-2xl shadow-xs border border-gray-100">
                  <div className={`p-2 rounded-xl ${prop.bg} shrink-0`}>
                    {prop.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-luxury-dark">{prop.title}</h5>
                    <p className="text-[11px] text-gray-500 leading-normal mt-0.5 font-light">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Stats grid display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-gold">
                {stat.value}
              </span>
              <h4 className="text-xs uppercase tracking-wider font-bold text-luxury-dark">{stat.label}</h4>
              <p className="text-[10px] text-gray-400 font-light">{stat.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
