import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eye, Instagram, Sparkles, MessageSquare, Heart } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

import balayageHighlightImg from '../assets/images/balayage_highlights_1784447983278.jpg';
import bengaliBridalLookImg from '../assets/images/bengali_bridal_makeup_1784447943663.jpg';
import afterHairBotoxImg from '../assets/images/after_botox_hair_1784447970182.jpg';
import beforeHairFrizzyImg from '../assets/images/before_frizzy_hair_1784447957594.jpg';

export default function GallerySection() {
  // Before After Slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderAfterLoaded, setSliderAfterLoaded] = useState(false);
  const [sliderBeforeLoaded, setSliderBeforeLoaded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Measure container width and observe size changes
  useEffect(() => {
    if (!sliderRef.current) return;
    
    setContainerWidth(sliderRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-slide animation on load to show off interactive capability
  useEffect(() => {
    let timeoutId: any;
    let frameId: number;
    let startTime: number | null = null;
    let hasInteracted = false;

    const animate = (timestamp: number) => {
      if (hasInteracted) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Smooth wave back and forth over 2.5 seconds (50 -> 25 -> 75 -> 50)
      if (elapsed < 2500) {
        const progress = elapsed / 2500;
        const wave = Math.sin(progress * Math.PI * 2) * 25 + 50;
        setSliderPosition(wave);
        frameId = requestAnimationFrame(animate);
      } else {
        setSliderPosition(50);
      }
    };

    // Delay start of animation slightly
    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, 1200);

    const handleInteraction = () => {
      hasInteracted = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('mousedown', handleInteraction, { passive: true });
      slider.addEventListener('touchstart', handleInteraction, { passive: true });
    }

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
      if (slider) {
        slider.removeEventListener('mousedown', handleInteraction);
        slider.removeEventListener('touchstart', handleInteraction);
      }
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const masonryImages = [
    {
      title: 'Global Balayage Highlight',
      category: 'Hair Couture',
      image: balayageHighlightImg,
      size: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Luxury 7-in-1 Hydra Facial',
      category: 'Advanced Aesthetics',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
      size: 'md:col-span-1 md:row-span-2'
    },
    {
      title: 'Royal Bengali Bridal Look',
      category: 'Bridal Makeover',
      image: bengaliBridalLookImg,
      size: 'md:col-span-2 md:row-span-1'
    },
    {
      title: 'Marble Nail Art & Gel Extensions',
      category: 'Nail Artistry',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
      size: 'md:col-span-1 md:row-span-1'
    },
    {
      title: 'Precision Hair Cut & Gloss Blow-out',
      category: 'Hair Couture',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
      size: 'md:col-span-1 md:row-span-1'
    }
  ];

  const instagramPosts = [
    { likes: '342', comments: '18', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300' },
    { likes: '512', comments: '32', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=300' },
    { likes: '298', comments: '11', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=300' },
    { likes: '422', comments: '21', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-rosegold uppercase font-bold font-sans">Client Transformations</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight">
            See the Magic of <span className="italic">Elgo Glamour</span>
          </h3>
          <p className="text-gray-500 font-light text-sm">
            Real clients, real results. Drag the hair botox transformation slider below to witness the ultimate frizz-free silkiness, or explore our curated portfolio.
          </p>
        </div>

        {/* Before After Interactive Slider */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[10px] font-semibold text-gold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-gold" />
              Interactive Hair Botox Comparison
            </span>
          </div>

          <div 
            ref={sliderRef}
            className="slider-container relative w-full h-[400px] sm:h-[480px] rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden cursor-ew-resize select-none bg-neutral-100"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Shimmer Placeholder Overlay */}
            {(!sliderAfterLoaded || !sliderBeforeLoaded) && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse">
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="w-8 h-8 text-gold animate-bounce" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest animate-pulse">Comparing Aesthetics...</span>
                </div>
              </div>
            )}

            {/* After Image (Background) */}
            <img 
              src={afterHairBotoxImg} 
              alt="Silky Mirror-Shine Hair After Botox" 
              onLoad={() => setSliderAfterLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover filter saturate-[1.2] contrast-[1.05] brightness-105 transition-opacity duration-500 ${sliderAfterLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: '75% center' }}
              referrerPolicy="no-referrer"
              draggable="false"
            />

            {/* Before Image (Slideable overlay) */}
            <div 
              className="absolute inset-y-0 left-0 overflow-hidden border-r border-white/50"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={beforeHairFrizzyImg} 
                alt="Frizzy Dry Hair Before Botox" 
                onLoad={() => setSliderBeforeLoaded(true)}
                className={`absolute top-0 left-0 h-full object-cover filter saturate-[0.8] contrast-95 transition-opacity duration-500 ${sliderBeforeLoaded ? 'opacity-100' : 'opacity-0'}`}
                referrerPolicy="no-referrer"
                style={{ 
                  width: `${containerWidth || 800}px`, 
                  maxWidth: 'none',
                  objectPosition: '75% center'
                }}
                draggable="false"
              />
            </div>

            {/* Static Badges on top bar */}
            <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full z-10 whitespace-nowrap shadow-md">
              💇‍♀️ Before (Dry / Frizzy)
            </div>
            <div className="absolute top-4 right-4 bg-gold backdrop-blur-md text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full z-10 whitespace-nowrap shadow-md">
              ✨ After (Mirror Botox Glow)
            </div>

            {/* Drag Handle Bar */}
            <div 
              className="absolute inset-y-0 w-1 bg-white z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Button Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gold hover:text-white text-luxury-dark rounded-full shadow-2xl border-2 border-gold flex items-center justify-center transition-colors">
                <span className="text-sm font-bold">↔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h4 className="font-serif font-bold text-xl text-luxury-dark tracking-tight">Our Premium <span className="italic">Dermal & Styling</span> Book</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]" id="portfolio-masonry-grid">
            {masonryImages.map((item, index) => (
              <div 
                key={index} 
                className={`relative rounded-3xl overflow-hidden shadow-sm group ${item.size}`}
              >
                <OptimizedImage 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  noCache={false}
                />
                
                {/* Luxury gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                
                {/* Content overlays */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] tracking-widest uppercase font-bold text-gold">{item.category}</span>
                    <h5 className="font-serif font-semibold text-sm sm:text-base">{item.title}</h5>
                  </div>
                  <span className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Feed Integration Showcase */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 text-center" id="instagram-feed-showcase">
          <div className="max-w-xl mx-auto space-y-4 mb-10">
            <Instagram className="w-8 h-8 text-rosegold mx-auto" />
            <h4 className="font-display font-semibold text-lg sm:text-xl text-luxury-dark">Join Our Glamour Circle on Instagram</h4>
            <p className="text-xs text-gray-500 font-light">
              Follow <a href="https://instagram.com/ElgoGlamourWorld" className="text-rosegold font-medium hover:underline">@ElgoGlamourWorld</a> for daily aesthetic reveals, pre-wedding skin schedules, and exclusive discount codes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <a 
                key={index}
                href="https://instagram.com/ElgoGlamourWorld"
                target="_blank"
                referrerPolicy="no-referrer"
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs"
              >
                <OptimizedImage 
                  src={post.img} 
                  alt="Elgo Glamour Instagram Post" 
                  className="w-full h-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  aspectRatio="aspect-square"
                  noCache={false}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 text-white text-xs font-sans">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 fill-current" /> {post.comments}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
