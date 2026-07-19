import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data/blogs';
import { Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { BlogItem } from '../types';

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBlog, setActiveBlog] = useState<BlogItem | null>(null);

  const categories = ['All', 'Bridal Guides', 'Hair Care', 'Seasonal Beauty'];

  const filteredBlogs = blogPosts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <section id="blog" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] text-gold uppercase font-bold font-sans">Elgo Editorial</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight">
            Beauty, Hair & <span className="italic">Skincare Insights</span>
          </h3>
          <p className="text-gray-500 font-light text-sm">
            Expert grooming guides, seasonal skincare protocols, and luxury bridal checklists curated by our senior salon directors.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'border-rosegold bg-rosegold text-white shadow-xs'
                  : 'border-gray-200 bg-white text-gray-500 hover:text-luxury-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100 hover:shadow-lg hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-luxury-dark text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-150">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-3">
                  {/* Meta labels */}
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-sans font-light">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {post.author.split(' (')[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif font-semibold text-base sm:text-lg text-luxury-dark hover:text-gold transition-colors duration-200 leading-tight">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-gray-500 font-light text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read more button */}
                <div className="pt-4 border-t border-gray-100 flex items-center">
                  <button
                    onClick={() => setActiveBlog(post)}
                    className="text-xs font-bold uppercase tracking-widest text-gold hover:text-rosegold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Dynamic Modal for Expanded Article */}
        <AnimatePresence>
          {activeBlog && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveBlog(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10"
              >
                {/* Header image banner */}
                <div className="relative h-[240px] sm:h-[300px]">
                  <img 
                    src={activeBlog.image} 
                    alt={activeBlog.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveBlog(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-md rounded-full transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="inline-block px-2.5 py-1 bg-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                      {activeBlog.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-tight">
                      {activeBlog.title}
                    </h3>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Author credit bar */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-rosegold" />
                      <span>Written by <strong className="text-luxury-dark font-medium">{activeBlog.author}</strong></span>
                    </div>
                    <span className="text-[11px] font-light">{activeBlog.date} • {activeBlog.readTime}</span>
                  </div>

                  {/* Body Paragraphs */}
                  <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
                    {activeBlog.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Trust warning footnote */}
                  <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl flex gap-3 mt-8">
                    <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-500 leading-normal">
                      <strong>Professional Notice:</strong> While our blogs offer high-value aesthetic suggestions, we highly encourage booking a face-to-face consultation so our therapists can examine your specific hair and skin structure under proper lighting.
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
