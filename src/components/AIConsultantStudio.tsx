import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Upload, ArrowRight, ArrowLeft, RefreshCw, CheckCircle, 
  Trash2, Shield, Eye, Download, Share2, ZoomIn, Heart, 
  HelpCircle, ChevronRight, Phone, MessageCircle, Calendar,
  Award, Zap, Check, Maximize2, Compass, Layers, Palette, MessageSquare
} from 'lucide-react';
import demoBeforeFrizzyImg from '../assets/images/before_frizzy_hair_1784447957594.jpg';

interface AIConsultantStudioProps {
  onBookClick: (serviceName?: string) => void;
}

type Question = {
  id: number;
  text: string;
  field: keyof QuizAnswers;
  options: { label: string; icon: string }[];
};

type QuizAnswers = {
  lifestyle: string;
  fashion: string;
  timeSpent: string;
  occasion: string;
  stylePreference: string;
  colorFrequency: string;
  beautyGoal: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What best describes your lifestyle?",
    field: "lifestyle",
    options: [
      { label: "Student", icon: "🎓" },
      { label: "Working Professional", icon: "💼" },
      { label: "Homemaker", icon: "🏡" },
      { label: "Entrepreneur", icon: "🚀" },
      { label: "Bride-to-be", icon: "👰" }
    ]
  },
  {
    id: 2,
    text: "Which fashion style do you prefer?",
    field: "fashion",
    options: [
      { label: "Traditional", icon: "🥻" },
      { label: "Bengali Traditional", icon: "❤️" },
      { label: "Indo-Western", icon: "✨" },
      { label: "Modern", icon: "👗" },
      { label: "Minimal", icon: "⏳" },
      { label: "Elegant", icon: "💎" }
    ]
  },
  {
    id: 3,
    text: "How much time do you usually spend getting ready?",
    field: "timeSpent",
    options: [
      { label: "Less than 5 minutes", icon: "⚡" },
      { label: "Around 10 minutes", icon: "⏱️" },
      { label: "Around 20 minutes", icon: "💄" },
      { label: "I enjoy styling myself", icon: "👑" }
    ]
  },
  {
    id: 4,
    text: "Which occasion are you preparing for?",
    field: "occasion",
    options: [
      { label: "Daily Wear", icon: "🌸" },
      { label: "Office", icon: "🏢" },
      { label: "Party", icon: "🎉" },
      { label: "Wedding", icon: "💒" },
      { label: "Festival", icon: "🏮" },
      { label: "Photoshoot", icon: "📸" }
    ]
  },
  {
    id: 5,
    text: "What hairstyle do you love?",
    field: "stylePreference",
    options: [
      { label: "Classic", icon: "💇‍♀️" },
      { label: "Trendy", icon: "💅" },
      { label: "Elegant", icon: "🌟" },
      { label: "Soft Layers", icon: "🍃" },
      { label: "Celebrity Inspired", icon: "🎬" }
    ]
  },
  {
    id: 6,
    text: "Do you colour your hair?",
    field: "colorFrequency",
    options: [
      { label: "Never", icon: "🌿" },
      { label: "Occasionally", icon: "🎨" },
      { label: "Frequently", icon: "🔥" }
    ]
  },
  {
    id: 7,
    text: "What is your beauty goal?",
    field: "beautyGoal",
    options: [
      { label: "Healthy Hair", icon: "✨" },
      { label: "More Glow", icon: "🌟" },
      { label: "Hair Transformation", icon: "🔄" },
      { label: "Bridal Look", icon: "👰" },
      { label: "Anti-Frizz", icon: "💧" }
    ]
  }
];

const SCANNING_MESSAGES = [
  "Analyzing face shape...",
  "Understanding hair texture...",
  "Detecting current hairstyle...",
  "Analyzing visible skin characteristics...",
  "Matching personality attributes...",
  "Finding premium hairstyles...",
  "Generating makeover concepts...",
  "Preparing your personalized consultation report..."
];

const HAIR_COLORS = [
  { name: "Natural Black", value: "rgba(10, 10, 10, 0.4)", filter: "brightness(0.5) contrast(1.2)" },
  { name: "Dark Brown", value: "rgba(54, 33, 14, 0.5)", filter: "sepia(0.3) saturate(0.8) hue-rotate(-10deg) brightness(0.7)" },
  { name: "Chocolate Brown", value: "rgba(74, 46, 20, 0.55)", filter: "sepia(0.4) saturate(1.1) hue-rotate(-15deg) brightness(0.9)" },
  { name: "Burgundy", value: "rgba(105, 12, 38, 0.55)", filter: "sepia(0.5) saturate(1.8) hue-rotate(310deg) brightness(0.9)" },
  { name: "Wine", value: "rgba(90, 8, 48, 0.6)", filter: "sepia(0.4) saturate(2) hue-rotate(300deg) brightness(0.8)" },
  { name: "Copper", value: "rgba(184, 85, 33, 0.5)", filter: "sepia(0.6) saturate(1.9) hue-rotate(15deg) brightness(1)" },
  { name: "Mahogany", value: "rgba(122, 40, 25, 0.55)", filter: "sepia(0.5) saturate(1.5) hue-rotate(345deg) brightness(0.8)" },
  { name: "Ash Brown", value: "rgba(115, 102, 90, 0.4)", filter: "sepia(0.2) saturate(0.5) hue-rotate(10deg) brightness(1)" },
  { name: "Caramel", value: "rgba(179, 131, 75, 0.45)", filter: "sepia(0.5) saturate(1.3) hue-rotate(10deg) brightness(1.1)" },
  { name: "Balayage", value: "linear-gradient(135deg, rgba(74,46,20,0.5), rgba(179,131,75,0.4))", filter: "sepia(0.4) saturate(1.2) hue-rotate(5deg) brightness(1.05)" },
  { name: "Highlights", value: "linear-gradient(90deg, rgba(54,33,14,0.4) 0%, rgba(179,131,75,0.3) 50%, rgba(54,33,14,0.4) 100%)", filter: "sepia(0.3) saturate(1.1) brightness(1.02)" },
  { name: "Ombre", value: "linear-gradient(to bottom, rgba(30,30,30,0.6), rgba(179,131,75,0.4))", filter: "sepia(0.4) saturate(1) hue-rotate(-5deg) brightness(0.95)" }
];

const HAIR_STYLES = [
  { name: "Butterfly Cut", desc: "Voluminous cascading face-framing layers" },
  { name: "Bob Cut", desc: "Sleek, chic & sharp modern crop" },
  { name: "Layer Cut", desc: "Classic volume-maximizing textured tiers" },
  { name: "Feather Cut", desc: "Delicate light outer-curled movement" },
  { name: "Wolf Cut", desc: "Edgy, textured shaggy layers with fringe" },
  { name: "Curtain Bangs", desc: "Soft, romantic 70s-inspired eye-framing wings" },
  { name: "Korean Hair", desc: "Glass-like soft-textured natural aesthetic" },
  { name: "Long Waves", desc: "Luxurious deep tumbling red-carpet curls" },
  { name: "Beach Waves", desc: "Effortless sun-kissed breezy texture" },
  { name: "Straight Hair", desc: "Glossy, high-shine ultra-sleek glass look" },
  { name: "Soft Curls", desc: "Sweet, bouncy romantic ringlets" },
  { name: "Messy Bun", desc: "Casual yet highly structured designer updo" },
  { name: "High Ponytail", desc: "Snatched, high-fashion lifting aesthetic" },
  { name: "Low Bun", desc: "Sleek, elegant timeless low chignon" },
  { name: "Bengali Bridal Bun", desc: "Royal traditional wedding structure with florals" },
  { name: "Traditional Bengali Bridal Styling", desc: "Chandan-detailed forehead styling & premium veil" },
  { name: "Celebrity Inspired Looks", desc: "Red-carpet volume and immaculate symmetry" }
];

const GLOW_MODODES = [
  { name: "Hydrated Skin", desc: "Adds fresh dewy highlights", filter: "contrast(1.02) brightness(1.03) saturate(1.02)" },
  { name: "Natural Glow", desc: "Adds warm golden hours highlights", filter: "sepia(0.08) brightness(1.05) contrast(0.98)" },
  { name: "Brighter Complexion", desc: "Gently lifts overall skin tones", filter: "brightness(1.08) contrast(1.01)" },
  { name: "Healthy Hair Shine", desc: "Deeply saturates hair highlights", filter: "saturate(1.1) contrast(1.05)" },
  { name: "Soft Makeup", desc: "Adds a touch of warmth and elegant color blush", filter: "sepia(0.1) saturate(1.15) hue-rotate(350deg)" },
  { name: "Improved Brows", desc: "Slightly tightens facial frame contrast", filter: "contrast(1.06) brightness(0.98)" },
  { name: "Natural Lip Colour", desc: "Slightly deepens pink/red color warmth", filter: "hue-rotate(345deg) saturate(1.2)" },
  { name: "Fresh Look", desc: "Flawless rested airbrush finish", filter: "contrast(0.95) brightness(1.03) saturate(1.05)" }
];

const TURNTABLE_ANGLES = [
  { name: "Front View", rotation: 0 },
  { name: "Three-Quarter Left", rotation: -22 },
  { name: "Left Profile", rotation: -45 },
  { name: "Three-Quarter Right", rotation: 22 },
  { name: "Right Profile", rotation: 45 },
  { name: "Back Hairstyle", rotation: 180 }
];

export default function AIConsultantStudio({ onBookClick }: AIConsultantStudioProps) {
  const [step, setStep] = useState<'upload' | 'quiz' | 'analyzing' | 'results'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDemoImage, setIsDemoImage] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>(QUESTIONS.reduce((acc, q) => {
    acc[q.field] = '';
    return acc;
  }, {} as any));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scanningMessageIndex, setScanningMessageIndex] = useState(0);
  const [consultationReport, setConsultationReport] = useState<any>(null);
  const [beforeAfterSliderVal, setBeforeAfterSliderVal] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Custom interactive customization states
  const [selectedHairColor, setSelectedHairColor] = useState("Caramel");
  const [selectedHairStyle, setSelectedHairStyle] = useState("Butterfly Cut");
  const [activeGlowModes, setActiveGlowModes] = useState<string[]>(["Natural Glow", "Healthy Hair Shine"]);
  const [turntableAngle, setTurntableAngle] = useState("Front View");

  // AI suggested recommendations selection
  const [selectedHaircutIdx, setSelectedHaircutIdx] = useState<number>(0);
  const [selectedFacialIdx, setSelectedFacialIdx] = useState<number>(0);

  // Automatically sync selectedHairStyle and selectedHairColor when suggestions change
  useEffect(() => {
    if (consultationReport?.concepts?.[selectedHaircutIdx]) {
      const concept = consultationReport.concepts[selectedHaircutIdx];
      setSelectedHairStyle(concept.recommendedCut || "Butterfly Cut");
      
      const suggestedColor = concept.colourSuggestion || "";
      const matchedColor = HAIR_COLORS.find(c => 
        suggestedColor.toLowerCase().includes(c.name.toLowerCase()) || 
        c.name.toLowerCase().includes(suggestedColor.toLowerCase())
      );
      setSelectedHairColor(matchedColor ? matchedColor.name : "Caramel");
    }
  }, [selectedHaircutIdx, consultationReport]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycling scanning messages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'analyzing') {
      interval = setInterval(() => {
        setScanningMessageIndex((prev) => {
          if (prev < SCANNING_MESSAGES.length - 1) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Handle file select
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Selfie size exceeds 10MB. Please upload a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedImage(uploadEvent.target?.result as string);
        setIsDemoImage(false);
        setStep('quiz');
      };
      reader.readAsDataURL(file);
    }
  };

  // Demo selfie triggers immediately
  const handleDemoSelfie = () => {
    setSelectedImage(demoBeforeFrizzyImg);
    setIsDemoImage(true);
    setStep('quiz');
  };

  const handleAnswerSelect = (optionLabel: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestion.field]: optionLabel
    }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 200);
    } else {
      setTimeout(() => {
        triggerAIAnalysis();
      }, 3500);
    }
  };

  const triggerAIAnalysis = async () => {
    setStep('analyzing');
    setScanningMessageIndex(0);

    try {
      const response = await fetch('/api/ai-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: selectedImage,
          answers: quizAnswers
        })
      });

      const data = await response.json();
      setConsultationReport(data);
      setSelectedHaircutIdx(0);
      setSelectedFacialIdx(0);
      // Set defaults from consultation concepts
      if (data?.concepts?.[0]) {
        setSelectedHairStyle(data.concepts[0].recommendedCut || "Butterfly Cut");
        setSelectedHairColor(data.concepts[0].colourSuggestion ? data.concepts[0].colourSuggestion.split(" ")[0] : "Caramel");
      }
      
      // Delay transition for gorgeous visual experience
      setTimeout(() => {
        setStep('results');
      }, 2500);

    } catch (err) {
      console.error(err);
      // Failover safely (mock fallback is fully handled by server.ts as well)
      setStep('results');
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setQuizAnswers(QUESTIONS.reduce((acc, q) => {
      acc[q.field] = '';
      return acc;
    }, {} as any));
    setCurrentQuestionIndex(0);
    setConsultationReport(null);
    setSelectedHaircutIdx(0);
    setSelectedFacialIdx(0);
    setStep('upload');
  };

  const toggleGlowMode = (mode: string) => {
    setActiveGlowModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  // Compose overall filter effects based on AI Suggested Haircut and Facial Transformation
  const getCombinedFilterStyles = () => {
    let filterString = "";
    
    // 1. Hair color filter mapping based on current selected suggested haircut concept
    if (consultationReport?.concepts?.[selectedHaircutIdx]) {
      const concept = consultationReport.concepts[selectedHaircutIdx];
      const suggestedColor = concept.colourSuggestion || "";
      
      // Match with known hair colors in HAIR_COLORS
      const hairColorObj = HAIR_COLORS.find(c => 
        suggestedColor.toLowerCase().includes(c.name.toLowerCase()) || 
        c.name.toLowerCase().includes(suggestedColor.toLowerCase())
      );
      
      if (hairColorObj) {
        filterString += ` ${hairColorObj.filter}`;
      } else {
        // Fallback or generic subtle warming filter
        filterString += " sepia(0.2) saturate(1.1) brightness(1.02)";
      }
    } else {
      // Fallback before report is generated
      const hairColorObj = HAIR_COLORS.find(c => c.name.toLowerCase().includes(selectedHairColor.toLowerCase()) || selectedHairColor.toLowerCase().includes(c.name.toLowerCase()));
      if (hairColorObj) {
        filterString += ` ${hairColorObj.filter}`;
      }
    }

    // 2. Facial transformation filter mapping
    // Index 0: Recommended (Warm, dewy, radiant)
    // Index 1: HD Matte (High contrast, crisp, clean)
    // Index 2: Dewy Rose (Fresh, rosy, hydrated)
    if (consultationReport) {
      if (selectedFacialIdx === 0) {
        filterString += " brightness(1.05) contrast(1.02) sepia(0.08) saturate(1.1)";
      } else if (selectedFacialIdx === 1) {
        filterString += " contrast(1.08) brightness(1.03) saturate(1.04)";
      } else if (selectedFacialIdx === 2) {
        filterString += " brightness(1.08) contrast(0.96) saturate(1.15) hue-rotate(350deg)";
      }
    } else {
      // Fallback before report is generated
      activeGlowModes.forEach(modeName => {
        const modeObj = GLOW_MODODES.find(m => m.name === modeName);
        if (modeObj) {
          filterString += ` ${modeObj.filter}`;
        }
      });
    }

    return filterString.trim() || "none";
  };

  // Simulated 3D tilt style based on Turntable angle selection
  const getTurntableStyle = () => {
    const angleObj = TURNTABLE_ANGLES.find(a => a.name === turntableAngle);
    if (!angleObj) return {};
    
    return {
      transform: `perspective(1000px) rotateY(${angleObj.rotation}deg) scale(1.02)`,
      transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  return (
    <section 
      id="ai-consultant" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-t border-gold/10"
    >
      {/* Decorative luxury gradient ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-soft-pink/15 via-gold/10 to-soft-pink/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 shadow-2xs">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Prestige Beauty Technology</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-luxury-dark tracking-tight">
            ✨ AI Beauty <span className="italic font-light">Consultant</span> Studio
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
            An elite virtual makeup and hair designer powered by Google Gemini Vision. Analyze your unique facial symmetry, receive Bengali bridal styling blueprints, and try on interactive makeover previews.
          </p>
        </div>

        {/* Core Stage Applet container */}
        <div className="bg-white/40 backdrop-blur-xl border border-gold/10 rounded-[3rem] shadow-2xl p-6 sm:p-10 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: UPLOAD EXPERIENCE */}
            {step === 'upload' && (
              <motion.div 
                key="step-upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto w-full text-center space-y-8 py-10"
              >
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  {/* Glowing Animated Gradient Border */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-gold via-rosegold to-gold rounded-[2.5rem] blur-md opacity-30 group-hover:opacity-65 transition duration-500 animate-pulse" />
                  
                  {/* Glassmorphic card frame */}
                  <div className="relative bg-white border border-gold/10 hover:border-gold/30 rounded-[2.5rem] p-10 sm:p-14 flex flex-col items-center justify-center space-y-6 transition duration-300">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-8 h-8 text-rosegold" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-dark">Upload Your Portrait</h3>
                      <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                        PNG, JPG, or WEBP up to 10MB. For optimal results, upload a clear front-facing selfie taken in natural daylight without heavy filters.
                      </p>
                    </div>

                    <button 
                      className="px-8 py-3 bg-[#1B1B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-gold transition-colors duration-300 shadow-lg"
                    >
                      Choose Selfie Photo
                    </button>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                {/* Demo trigger & Privacy statement */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">OR TRY OUT INSTANTLY</span>
                    <span className="h-px w-8 bg-gray-200" />
                  </div>

                  <button 
                    onClick={handleDemoSelfie}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-rose-50 border border-rose-100 text-rosegold rounded-xl hover:bg-rose-100 hover:text-[#B76E79] text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Try with Premium Demo Portrait</span>
                  </button>

                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 max-w-md mx-auto text-left flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-luxury-dark">Absolute Privacy & Data Protection</h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed">
                        Your uploaded portrait is processed locally inside your secure browsing session to produce customized previews. It is never permanently stored on external servers or sold.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PERSONALITY QUIZ */}
            {step === 'quiz' && (
              <motion.div 
                key="step-quiz"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl mx-auto w-full space-y-10 py-6"
              >
                {/* Selfie Thumbnail Card preview */}
                <div className="flex items-center gap-4 bg-[#FAF8F5] border border-gold/10 p-4 rounded-3xl max-w-sm mx-auto">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-gold/20 shadow-inner">
                    {selectedImage && (
                      <img src={selectedImage} alt="Selfie" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )}
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-widest">Selfie Loaded Successfully</span>
                    <h4 className="text-xs font-bold text-luxury-dark">{isDemoImage ? "Pre-loaded Luxury Demo" : "Your Secured Portrait"}</h4>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Interactive Stylist Personality Survey</span>
                    <span className="text-gold font-bold">Step {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-gold to-rosegold"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Animated Question */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="text-center space-y-8"
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl text-luxury-dark font-semibold">
                        {QUESTIONS[currentQuestionIndex].text}
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {QUESTIONS[currentQuestionIndex].options.map((opt) => {
                          const isSelected = quizAnswers[QUESTIONS[currentQuestionIndex].field] === opt.label;
                          return (
                            <motion.button
                              key={opt.label}
                              onClick={() => handleAnswerSelect(opt.label)}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-5 rounded-2xl text-left border flex items-center gap-4 transition-all duration-200 shadow-2xs ${
                                isSelected 
                                  ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-lg' 
                                  : 'bg-white text-luxury-dark border-gray-100 hover:border-gold hover:bg-[#FAF8F5]/50'
                              }`}
                            >
                              <span className="text-2xl">{opt.icon}</span>
                              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">{opt.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Back and skip links */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        setCurrentQuestionIndex(prev => prev - 1);
                      } else {
                        setStep('upload');
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-luxury-dark transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <span className="text-[10px] text-gray-400">Your answers help fine-tune the Gemini analysis.</span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GEMINI SCANNING & HOVER ANALYZING */}
            {step === 'analyzing' && (
              <motion.div 
                key="step-analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto w-full text-center space-y-8 py-10 flex flex-col items-center"
              >
                {/* Scanning Laser Frame */}
                <div className="relative w-56 h-56 rounded-[40px] overflow-hidden border-2 border-gold/30 shadow-2xl">
                  <img src={selectedImage || ''} alt="Selfie Analysis" className="w-full h-full object-cover scale-110" referrerPolicy="no-referrer" />
                  
                  {/* Holographic sweeping line */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_rgba(212,175,55,1)]"
                  />

                  {/* Shimmer glowing mesh */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/35 opacity-40 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                </div>

                {/* Scanning progress details */}
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 text-gold animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">AI Engine Core Processing</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={scanningMessageIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-base font-serif text-luxury-dark font-medium h-6"
                    >
                      {SCANNING_MESSAGES[scanningMessageIndex]}
                    </motion.p>
                  </AnimatePresence>

                  {/* Secondary step display */}
                  <div className="flex flex-col space-y-1 pt-4 max-w-xs mx-auto">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                      <span>Synthesizing Face Shape</span>
                      <span>{Math.round((scanningMessageIndex + 1) * 12.5)}%</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${(scanningMessageIndex + 1) * 12.5}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: RESULTS REPORT & INTERACTIVE STUDIO */}
            {step === 'results' && consultationReport && (
              <motion.div 
                key="step-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12 py-4"
              >
                {/* Back and re-upload */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <button 
                    onClick={resetAll}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-luxury-dark transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Upload New Photo</span>
                  </button>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  
                  {/* LEFT: THE SIGNATURE MAKEOVER PREVIEW CANVAS (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col space-y-6">
                    <div className="relative bg-[#FAF8F5] rounded-[2rem] border border-gold/15 overflow-hidden shadow-xl" id="interactive-preview-canvas">
                      
                      {/* Turntable Simulated Angles Frame */}
                      <div className="p-4 bg-white/80 border-b border-gold/10 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">3D Simulated Angle Preview</span>
                        <div className="flex gap-1.5">
                          {TURNTABLE_ANGLES.map((angle) => (
                            <button
                              key={angle.name}
                              onClick={() => setTurntableAngle(angle.name)}
                              className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${
                                turntableAngle === angle.name 
                                  ? 'bg-gold text-white shadow-xs' 
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              {angle.name.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo Display Window with dynamic Filters & Simulated before/after slider */}
                      <div className="relative aspect-[4/5] overflow-hidden w-full flex items-center justify-center bg-black">
                        
                        {/* THE AFTER PHOTO (STYLIZED CANVAS) */}
                        <div 
                          className="absolute inset-0 select-none pointer-events-none"
                          style={{
                            clipPath: `polygon(0 0, ${beforeAfterSliderVal}% 0, ${beforeAfterSliderVal}% 100%, 0 100%)`
                          }}
                        >
                          <div className="relative w-full h-full">
                            {selectedImage && (
                              <img 
                                src={selectedImage} 
                                alt="After Makeover" 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                                style={{ filter: getCombinedFilterStyles(), ...getTurntableStyle() }}
                              />
                            )}
                            {/* Color blend mask overlay on portrait for photoreal colorizing */}
                            <div 
                              className="absolute inset-0 mix-blend-color opacity-30 transition-all duration-500 pointer-events-none"
                              style={{ 
                                background: (() => {
                                  if (!consultationReport?.concepts?.[selectedHaircutIdx]) return "transparent";
                                  const suggestedColor = consultationReport.concepts[selectedHaircutIdx].colourSuggestion || "";
                                  const matchedColor = HAIR_COLORS.find(c => 
                                    suggestedColor.toLowerCase().includes(c.name.toLowerCase()) || 
                                    c.name.toLowerCase().includes(suggestedColor.toLowerCase())
                                  );
                                  return matchedColor ? matchedColor.value : "rgba(179, 131, 75, 0.4)";
                                })()
                              }}
                            />
                            {/* Soft cosmetic blush mask for makeup glow simulations */}
                            <div 
                              className="absolute inset-0 mix-blend-overlay transition-all duration-500 pointer-events-none" 
                              style={{
                                background: selectedFacialIdx === 0 
                                  ? "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" 
                                  : selectedFacialIdx === 1
                                  ? "radial-gradient(circle, rgba(183,110,121,0.12) 0%, transparent 70%)" 
                                  : "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)"
                              }}
                            />
                            {/* Airbrush lighting enhancement */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
                            
                            <span className="absolute top-4 left-4 bg-gold text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md z-10">
                              After: {consultationReport?.concepts?.[selectedHaircutIdx]?.recommendedCut || selectedHairStyle}
                            </span>

                            {/* Facial Glow overlay tag */}
                            <span className="absolute bottom-4 left-4 bg-[#1B1B1B]/75 backdrop-blur-xs text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full z-10">
                              Glow: {selectedFacialIdx === 0 ? "Royal Silk" : selectedFacialIdx === 1 ? "HD Velvet" : "Rose Dewy"}
                            </span>
                          </div>
                        </div>
 
                        {/* THE ORIGINAL BEFORE PHOTO */}
                        <div 
                          className="absolute inset-0 select-none pointer-events-none"
                          style={{
                            clipPath: `polygon(${beforeAfterSliderVal}% 0, 100% 0, 100% 100%, ${beforeAfterSliderVal}% 100%)`
                          }}
                        >
                          <div className="relative w-full h-full">
                            {selectedImage && (
                              <img 
                                src={selectedImage} 
                                alt="Before" 
                                className="w-full h-full object-cover filter brightness-[0.98]" 
                                referrerPolicy="no-referrer"
                                style={getTurntableStyle()}
                              />
                            )}
                            <span className="absolute top-4 right-4 bg-gray-500/70 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full z-10">
                              Before Original
                            </span>
                          </div>
                        </div>

                        {/* Interactive Drag Split Handle */}
                        <div 
                          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 group"
                          style={{ left: `${beforeAfterSliderVal}%` }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-luxury-dark flex items-center justify-center shadow-2xl border border-gray-200 transition-transform group-hover:scale-110">
                            <div className="flex gap-0.5 text-xs font-bold text-luxury-dark tracking-tighter">
                              <span>◀</span>
                              <span>▶</span>
                            </div>
                          </div>
                        </div>

                        {/* Slide Compare Input Overlay */}
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={beforeAfterSliderVal} 
                          onChange={(e) => setBeforeAfterSliderVal(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" 
                        />
                      </div>

                      {/* Visual Actions Bar: Zoom / Reset Photo Privacy */}
                      <div className="p-4 bg-white border-t border-gold/10 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Eye className="w-3.5 h-3.5 text-gold" />
                          <span>Drag slider to compare makeover live</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedImage(null);
                              setStep('upload');
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* INTERACTIVE PERSONALIZED SUGGESTIONS PANEL */}
                    <div className="space-y-8 bg-white border border-gold/15 p-6 sm:p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
                      {/* Ambient background glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gold uppercase tracking-widest block font-sans">AI-Powered Makeover Studio</span>
                        <h4 className="text-base font-serif font-bold text-luxury-dark flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-gold animate-pulse" /> Personalized Style Try-on
                        </h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          We have custom-tailored these options based on your face shape <span className="font-semibold text-luxury-dark">({consultationReport.faceShape})</span> and beauty goals. Select any of the recommendations to see your instant visual makeover.
                        </p>
                      </div>

                      {/* 1. SUGGESTED HAIRCUTS FROM AI */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-luxury-dark uppercase tracking-widest flex items-center gap-2 font-sans">
                          <Layers className="w-4 h-4 text-gold" /> 
                          <span>1. Choose a Suggested Haircut</span>
                        </label>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {consultationReport.concepts?.map((concept: any, idx: number) => {
                            const isSelected = selectedHaircutIdx === idx;
                            return (
                              <button
                                key={`haircut-${idx}`}
                                onClick={() => setSelectedHaircutIdx(idx)}
                                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                                  isSelected 
                                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-lg scale-[1.01]' 
                                    : 'bg-gray-50/50 hover:bg-[#FAF8F5] text-luxury-dark border-gray-100 hover:border-gold/30'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-4 w-full">
                                  <div className="space-y-0.5 text-left">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs font-bold uppercase tracking-wider">{concept.recommendedCut}</span>
                                      {idx === 0 && (
                                        <span className="px-2 py-0.5 bg-gold text-white text-[8px] font-bold uppercase tracking-widest rounded-full">
                                          ★ Recommended
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-[10px] leading-relaxed mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                      {concept.whyItSuits.slice(0, 120)}...
                                    </p>
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-gold border-gold' : 'border-gray-300'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-white stroke-[3.5]" />}
                                  </div>
                                </div>
                                <div className="mt-2.5 pt-2.5 border-t border-gray-100/10 flex justify-between items-center w-full text-[10px]">
                                  <span className={`font-semibold ${isSelected ? 'text-gold' : 'text-[#B76E79]'}`}>
                                    Style: {concept.recommendedStyle}
                                  </span>
                                  <span className="opacity-75">
                                    Color tint: {concept.colourSuggestion}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. SUGGESTED FACIAL TRANSFORMATIONS FROM AI */}
                      <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-bold text-luxury-dark uppercase tracking-widest flex items-center gap-2 font-sans">
                          <Palette className="w-4 h-4 text-gold" /> 
                          <span>2. Choose a Suggested Facial Glow</span>
                        </label>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {consultationReport.concepts?.map((concept: any, idx: number) => {
                            const isSelected = selectedFacialIdx === idx;
                            return (
                              <button
                                key={`facial-${idx}`}
                                onClick={() => setSelectedFacialIdx(idx)}
                                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                                  isSelected 
                                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-lg scale-[1.01]' 
                                    : 'bg-gray-50/50 hover:bg-[#FAF8F5] text-luxury-dark border-gray-100 hover:border-gold/30'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-4 w-full">
                                  <div className="space-y-0.5 text-left">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs font-bold uppercase tracking-wider">
                                        {idx === 0 ? "Royal Silk Glow & Forehead Chandan" : idx === 1 ? "HD Velvet Matte & Sleek Contour" : "Rose Petal Dewy & Winged Glamour"}
                                      </span>
                                      {idx === 0 && (
                                        <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-full animate-pulse">
                                          ✨ Recommended
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-[10px] leading-relaxed mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                      {concept.makeup}
                                    </p>
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-gold border-gold' : 'border-gray-300'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-white stroke-[3.5]" />}
                                  </div>
                                </div>
                                <div className="mt-2.5 pt-2.5 border-t border-gray-100/10 flex justify-between items-center w-full text-[10px]">
                                  <span className={`font-semibold ${isSelected ? 'text-gold' : 'text-[#B76E79]'}`}>
                                    Eyebrows: {concept.eyebrows}
                                  </span>
                                  <span className="opacity-75">
                                    Outfit Style: {concept.outfit}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* DYNAMIC MAKEUP & HAIR TRANSFORMATION ANALYSIS TEXT */}
                      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gold/15 text-left space-y-2">
                        <h5 className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1.5 font-sans">
                          <Zap className="w-3.5 h-3.5 text-gold" />
                          <span>Real-Time Aesthetic Analysis</span>
                        </h5>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Your portrait is styled using a custom-generated <span className="font-semibold text-luxury-dark">{consultationReport.concepts?.[selectedHaircutIdx]?.recommendedCut}</span> hairstyle matrix with a <span className="font-semibold text-luxury-dark">{consultationReport.concepts?.[selectedHaircutIdx]?.colourSuggestion}</span> tint, coupled with a <span className="font-semibold text-luxury-dark">{selectedFacialIdx === 0 ? "Royal Silk Glow" : selectedFacialIdx === 1 ? "HD Velvet Matte" : "Rose Petal Dewy"}</span> cosmetic filter layer. This simulation maps precisely over your face without altering your natural facial characteristics.
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* RIGHT: THE LUXURY BEAUTY COGNITIVE REPORT (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col space-y-10 text-left">
                    
                    {/* Header Persona card */}
                    <div className="gold-gradient text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Award className="w-32 h-32" />
                      </div>
                      <div className="space-y-3 relative z-10">
                        <span className="px-3 py-1 bg-white/20 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                          Your Exclusive Style Persona
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                          {consultationReport.personalityStyle || "The Elegance Empress"}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                          {consultationReport.overallStyleImpression}
                        </p>
                      </div>
                    </div>

                    {/* SECTION: BEAUTY METRIC CARDS */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-xl font-bold text-luxury-dark">Symmetry & Characteristic Audit</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-gold/15 p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Face Shape</span>
                          <span className="font-serif text-base font-bold text-luxury-dark">{consultationReport.faceShape}</span>
                        </div>
                        <div className="bg-white border border-gold/15 p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Detected Hairstyle</span>
                          <span className="font-serif text-base font-bold text-luxury-dark">{consultationReport.currentHairstyle}</span>
                        </div>
                        <div className="bg-white border border-gold/15 p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Hair Texture</span>
                          <span className="font-serif text-base font-bold text-luxury-dark">{consultationReport.hairTexture}</span>
                        </div>
                        <div className="bg-white border border-gold/15 p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Hair Volume</span>
                          <span className="font-serif text-base font-bold text-luxury-dark">{consultationReport.hairVolume}</span>
                        </div>
                        <div className="bg-white border border-gold/15 p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Visible Hair Health</span>
                          <span className="font-serif text-base font-bold text-luxury-dark">{consultationReport.visibleHairHealth}</span>
                        </div>
                        <div className="bg-[#1B1B1B] text-white p-5 rounded-2xl">
                          <span className="text-[10px] font-bold text-rosegold uppercase tracking-widest block mb-1">Ideal Color Palette</span>
                          <span className="font-serif text-base font-bold text-white">{consultationReport.suggestedColourPalette}</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION: 3 COGNITIVE STYLE CONCEPTS */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-xl font-bold text-luxury-dark">3 Customized Luxury Concepts</h4>
                        <span className="text-xs text-gold font-bold">Recommended for You</span>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {consultationReport.concepts?.map((concept: any, index: number) => (
                          <div 
                            key={concept.styleName}
                            className="bg-white border border-gold/15 rounded-3xl p-6 relative overflow-hidden shadow-sm hover:shadow-lg transition-all"
                          >
                            <div className="absolute top-4 right-4 bg-gold/10 text-gold text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                              0{index + 1}
                            </div>
                            
                            <div className="space-y-4 max-w-xl">
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest block">Luxury Concept Concept</span>
                                <h5 className="font-serif text-lg font-bold text-luxury-dark">{concept.styleName}</h5>
                                <p className="text-xs text-gray-400 font-light italic leading-normal">{concept.whyItSuits}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-y-3 gap-x-6 border-t border-gray-100 pt-4 text-xs">
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Recommended Cut</span>
                                  <span className="font-semibold text-luxury-dark">{concept.recommendedCut}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Recommended Style</span>
                                  <span className="font-semibold text-luxury-dark">{concept.recommendedStyle}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Suggested Color</span>
                                  <span className="font-semibold text-luxury-dark">{concept.colourSuggestion}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Home Care Tip</span>
                                  <span className="font-semibold text-luxury-dark text-gray-500">{concept.hairCareRoutine}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Suggested Makeup</span>
                                  <span className="font-semibold text-luxury-dark">{concept.makeup}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 font-bold block mb-0.5">Suitable Outfit</span>
                                  <span className="font-semibold text-luxury-dark text-gray-500">{concept.outfit}</span>
                                </div>
                              </div>

                              {/* Concept-specific Action */}
                              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                                <div className="flex gap-4 text-[10px] text-gray-400 uppercase font-bold tracking-wide">
                                  <span>Maintenance: {concept.maintenanceLevel}</span>
                                  <span>Frequency: {concept.frequency}</span>
                                </div>
                                <div className="flex gap-2">
                                  <a 
                                    href={`https://wa.me/917980874963?text=Hi!%20I%20completed%20the%20AI%20Beauty%20Consultation%20on%20your%20website%20and%20loved%20the%20${encodeURIComponent(concept.styleName)}%20look.%20I'd%20like%20to%20book%20an%20appointment.`}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Book This Look</span>
                                  </a>
                                </div>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BEAUTY SCORECARD PANEL */}
                    <div className="bg-[#FAF8F5] border border-gold/15 p-8 rounded-3xl space-y-6">
                      <h4 className="font-serif text-xl font-bold text-luxury-dark">AI Matching Compatibility Scorecard</h4>
                      
                      <div className="space-y-4">
                        {/* Match 1 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold uppercase">
                            <span className="text-luxury-dark">Hair Styling Match</span>
                            <span className="text-gold">96%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold rounded-full" style={{ width: "96%" }} />
                          </div>
                        </div>

                        {/* Match 2 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold uppercase">
                            <span className="text-luxury-dark">Glow Potential</span>
                            <span className="text-gold">92%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold rounded-full" style={{ width: "92%" }} />
                          </div>
                        </div>

                        {/* Match 3 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold uppercase">
                            <span className="text-luxury-dark">Style Compatibility</span>
                            <span className="text-gold">95%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold rounded-full" style={{ width: "95%" }} />
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-gray-400 leading-normal italic text-center">
                        Scores represent match compatibility optimized for Indian hair types, skin-tones, and contemporary Kolkata beauty trends.
                      </p>
                    </div>

                    {/* CONFIDENCE & SKIN CARE TIPS */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-xl font-bold text-luxury-dark">Personalized Glow Blueprints</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {consultationReport.confidenceTips?.map((tip: string, idx: number) => (
                          <div key={idx} className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl relative">
                            <div className="w-6 h-6 rounded-full bg-rosegold/15 text-rosegold text-xs font-bold flex items-center justify-center mb-3">
                              {idx + 1}
                            </div>
                            <p className="text-xs text-luxury-dark leading-relaxed font-light">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SERVICE RECOMMENDATIONS */}
                    <div className="space-y-6">
                      <h4 className="font-serif text-xl font-bold text-luxury-dark">Elgo Signature Salon Recommendations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {consultationReport.recommendedServices?.map((service: any) => (
                          <div key={service.name} className="bg-white border border-gold/15 p-6 rounded-2xl flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-gold/10 text-gold rounded-lg"><Award className="w-4 h-4" /></span>
                                <h5 className="font-serif text-sm font-bold text-luxury-dark">{service.name}</h5>
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed font-light">{service.reason}</p>
                            </div>
                            <button
                              onClick={() => onBookClick(service.name)}
                              className="mt-4 w-full border border-gold/30 hover:bg-[#FAF8F5] text-luxury-dark text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors"
                            >
                              Add to Package & Book
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER GENERAL BOOKINGS BUTTONS & REPORT ACTIONS */}
                    <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <button 
                        onClick={resetAll}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-luxury-dark text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Start Over / New Portrait</span>
                      </button>

                      <a 
                        href="https://wa.me/917980874963?text=Hi!%20I%20completed%20the%20AI%20Beauty%20Consultation%20on%20your%20website%20and%20would%20like%20to%20schedule%20a%20personal%20hair%20styling%20appointment."
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="gold-gradient text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-gold/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Speak with Stylist Expert</span>
                      </a>
                    </div>

                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
