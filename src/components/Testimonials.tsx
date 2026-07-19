import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../types';

export default function Testimonials() {
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      name: 'Ananya Sengupta',
      rating: 5,
      text: 'I booked Elgo Glamour World for my wedding makeup (HD Bridal Airbrush). Honestly, the experience was absolutely premium! Soma and her team are highly certified. The makeup was extremely lightweight, fully transfer-proof, and lasted from the morning rituals till the late-night reception. Everybody in my family praised the elegance of the styling.',
      date: 'May 14, 2026',
      platform: 'Google',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 'rev-2',
      name: 'Dr. Soumi Banerjee',
      rating: 5,
      text: 'As a medical professional, hygiene is my topmost concern. Elgo Glamour World has hospital-grade UV sterilizers and single-use disposable kits. I got their Hair Botox treatment and a 7-in-1 Hydra Facial. My hair has an incredible mirror shine now and my skin feels deeply purified. Highly recommend this premium salon near Durganagar Station!',
      date: 'June 22, 2026',
      platform: 'Google',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 'rev-3',
      name: 'Priyanka Dutta',
      rating: 5,
      text: 'Best Beauty Parlour in North Dumdum! Their prices are extremely reasonable for the high level of luxury they provide. The global balayage highlight I received is flawless and they used ammonia-free L’Oréal products which left my hair super soft. The staff is polite, inclusive, and incredibly skilled.',
      date: 'July 5, 2026',
      platform: 'Google',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 'rev-4',
      name: 'Debjani Roy',
      rating: 5,
      text: 'Got my acrylic nail extensions and chrome nail art here. The master artist is so detailed! They lasted almost 4 weeks without any chipping. This is my absolute go-to women-owned salon in Kolkata now.',
      date: 'July 15, 2026',
      platform: 'Google',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Vectors */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-soft-pink/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Panel: Social Proof Rating Widget */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <span className="text-xs tracking-[0.2em] text-gold uppercase font-bold font-sans">Our Testimonials</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight leading-tight">
              Trusted by <span className="italic">5,000+ Elegant</span> Clients
            </h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Our absolute dedication to premium brand formulations, hygienic workstations, and personalized consultations has earned Elgo Glamour World an outstanding reputation near Durganagar.
            </p>

            {/* Premium Google Rating Display Card */}
            <div className="bg-white border border-gold/25 p-6 rounded-[2rem] space-y-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-serif font-bold text-gold">4.8</span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 font-sans mt-0.5">Average Google Rating</p>
                </div>
              </div>
              <div className="text-xs text-gray-600 font-light leading-normal border-t border-gray-200/60 pt-4">
                Verified index score of <span className="font-bold text-luxury-dark">976+ reviews</span> submitted by local clients from North Dumdum, Birati, and Dum Dum Cantt.
              </div>
            </div>
          </div>

          {/* Right Panel: Sliding Interactive Review Cards */}
          <div className="lg:col-span-7 relative">
            <Quote className="absolute -top-10 -left-6 w-20 h-20 text-gold/10 pointer-events-none" />
            
            {/* Sliding Review Shell */}
            <div className="bg-white border border-gold/15 rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-8 relative z-10 min-h-[340px] flex flex-col justify-between">
              
              {/* Star rating & verified badge */}
              <div className="flex justify-between items-center">
                <div className="flex text-amber-400">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                {reviews[activeIndex].isVerified && (
                  <span className="flex items-center space-x-1 text-[10px] font-sans font-semibold text-emerald-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Elgo Client</span>
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 font-light italic text-sm sm:text-base leading-relaxed text-left">
                "{reviews[activeIndex].text}"
              </p>

              {/* Client Info Bar */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={reviews[activeIndex].avatar} 
                    alt={reviews[activeIndex].name} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="text-left">
                    <h5 className="font-serif font-semibold text-sm text-[#1B1B1B]">{reviews[activeIndex].name}</h5>
                    <p className="text-[10px] text-gray-400 font-sans font-light">{reviews[activeIndex].date} • via {reviews[activeIndex].platform}</p>
                  </div>
                </div>

                {/* Slider Control buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-gray-200 hover:border-gold text-luxury-dark hover:text-gold bg-white shadow-xs cursor-pointer transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-gray-200 hover:border-gold text-luxury-dark hover:text-gold bg-white shadow-xs cursor-pointer transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Slider visual dot indicators */}
            <div className="flex justify-center space-x-1.5 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-6 bg-gold' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
