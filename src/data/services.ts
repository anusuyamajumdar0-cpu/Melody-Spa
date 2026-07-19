import { ServiceCategory } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair Couture & Treatments',
    iconName: 'Scissors',
    description: 'Transform your hair with precision styling, advanced reconstruction treatments, and rich organic color formulas customized by our top therapists.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'hair-1', name: 'Signature Hair Cut & Styling', description: 'Personalized expert consultation, wash, deep scalp massage, precision cut, and blow-dry.', price: '₹999', duration: '60 mins', isPopular: true },
      { id: 'hair-2', name: 'Advanced Hair Spa (Luxury)', description: 'Deep conditioning and nourishing hydration mask using premium international brands for damaged/frizzy hair.', price: '₹1,999', duration: '75 mins' },
      { id: 'hair-3', name: 'Premium Hair Coloring (Global / Balayage)', description: 'Custom hair coloring using ammonia-free formulas that protect hair integrity while delivering high-gloss shine.', price: '₹4,499', duration: '150 mins', isPopular: true },
      { id: 'hair-4', name: 'Signature Hair Smoothening', description: 'Intense smoothening therapy that eliminates frizz, providing naturally soft and silky straight hair.', price: '₹5,999', duration: '180 mins' },
      { id: 'hair-5', name: 'Liquid Keratin Reconstructive Treatment', description: 'Restructure hair fiber from within, adding long-lasting strength, gloss, and absolute sleekness.', price: '₹6,499', duration: '120 mins' },
      { id: 'hair-6', name: 'Premium Hair Botox Therapy', description: 'Anti-aging hair treatment that deeply repairs cuticles, restoring volume, elasticity, and brilliant mirror shine.', price: '₹7,999', duration: '120 mins', isPopular: true },
      { id: 'hair-7', name: 'Luxury Seamless Hair Extensions', description: '100% natural Remy human hair extensions for custom thickness, volume, and exquisite length.', price: 'On Consultation', duration: '180 mins' },
      { id: 'hair-8', name: 'Elite Bridal Hair Styling', description: 'Exquisite bridal hair buns, custom curls, braids, and floral styling matching your couture.', price: '₹3,490', duration: '90 mins' },
      { id: 'hair-9', name: "Men's Classic Hair Cut & Beard Grooming", description: 'Custom hair wash, signature haircut, neck shave, beard trim/shaping, and nourishing argan oil massage.', price: '₹450', duration: '45 mins', isPopular: true },
      { id: 'hair-10', name: "Gentle Kid's Hair Cut", description: 'Fun, gentle hair trim for boys and girls under 12, finished with a styling gel or elegant braid.', price: '₹299', duration: '30 mins' }
    ]
  },
  {
    id: 'skin',
    name: 'Advanced Aesthetics & Skin Care',
    iconName: 'Sparkles',
    description: 'Reclaim radiant, youthful skin through medical-grade facials, premium biological peels, and clinical dermal therapies.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'skin-1', name: 'Advanced Hydra Facial (7-in-1)', description: 'Dermal deep cleansing, vacuum extraction, hydration infusion, ultrasonic lift, and cold hammer treatment.', price: '₹4,500', duration: '90 mins', isPopular: true },
      { id: 'skin-2', name: 'Luxury Gold Brightening Facial', description: 'Indulgent facial using 24k gold leaf serum and premium botanical masks for instant, deep cellular radiance.', price: '₹2,999', duration: '75 mins' },
      { id: 'skin-3', name: 'Deep Purifying Skin Cleanup', description: 'Clarifying treatment focusing on pore refinement, sebum balance, blackhead removal, and soothing hydration.', price: '₹1,199', duration: '45 mins' },
      { id: 'skin-4', name: 'Clinical Anti-Aging Dermal Treatment', description: 'Collagen-boosting facial using peptides and microcurrents to tighten contours and reduce fine lines.', price: '₹3,499', duration: '75 mins' },
      { id: 'skin-5', name: 'Pigmentation & Melasma Therapy', description: 'Advanced skin brightening treatment containing Vitamin C and Kojic acid to target uneven dark spots.', price: '₹2,799', duration: '60 mins' },
      { id: 'skin-6', name: 'Acne Control & Clarifying Peel', description: 'Salicylic-based gentle peel paired with tea tree soothing mask to combat acne-causing bacteria and heal scars.', price: '₹2,499', duration: '60 mins' }
    ]
  },
  {
    id: 'makeup',
    name: 'Luxury Makeup & Bridal Makeovers',
    iconName: 'Heart',
    description: 'Bespoke makeup services tailored to highlight your finest features, curated by Kolkata’s premier bridal makeup specialists.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'makeup-1', name: 'Luxury Bridal Makeup (HD / Airbrush)', description: 'Signature bridal look, hair styling, saree/lehenga draping, and accessory settings using Mac, Estée Lauder, and Huda Beauty.', price: '₹14,999', duration: '180 mins', isPopular: true },
      { id: 'makeup-2', name: 'High-Definition (HD) Party Makeup', description: 'Flawless camera-ready makeup for cocktails, festive parties, or family celebrations with premium styling.', price: '₹3,999', duration: '90 mins' },
      { id: 'makeup-3', name: 'Elite Airbrush Sangeet/Reception Makeup', description: 'Ultra-lightweight, transfer-proof, high-longevity base perfect for humid climates and long-lasting night events.', price: '₹6,499', duration: '120 mins', isPopular: true },
      { id: 'makeup-4', name: 'Elegant Engagement Makeup', description: 'Dewy, elegant look designed to accentuate natural features during morning or evening ring ceremonies.', price: '₹4,999', duration: '100 mins' },
      { id: 'makeup-5', name: 'Stunning Eye-Focus Makeup', description: 'Smokey eyes, premium winged liners, graphic details, and luxury mink eyelash installation.', price: '₹1,499', duration: '45 mins' }
    ]
  },
  {
    id: 'nail',
    name: 'Luxury Nail Artistry & Extensions',
    iconName: 'Hand',
    description: 'Pamper your hands and feet with intricate custom nail art, premium acrylic overlays, and therapeutic nail treatments.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'nail-1', name: 'Bespoke Nail Art (Handpainted / Stones)', description: 'Intricate custom designs, gold foils, marble patterns, or chrome effects on all fingers by master artists.', price: '₹1,199', duration: '60 mins', isPopular: true },
      { id: 'nail-2', name: 'Premium Gel Polish Overlay', description: 'High-shine, chip-resistant UV gel polish lasting up to 4 weeks on trimmed, filed natural nails.', price: '₹799', duration: '45 mins' },
      { id: 'nail-3', name: 'Luxury Acrylic / Gel Nail Extensions', description: 'Elegant extension of nail length with premium clear or French tips, complete with custom base color.', price: '₹1,999', duration: '90 mins', isPopular: true },
      { id: 'nail-4', name: 'Royal Rose Pedicure (Therapeutic)', description: 'Soothing foot soak in warm milk and rose petals, gentle salt scrub, massage, and hydrating pack.', price: '₹1,199', duration: '60 mins' },
      { id: 'nail-5', name: 'Nourishing Sea Minerals Manicure', description: 'Hand cuticle care, dead skin exfoliation with sea minerals, deep massage, and natural nail strengthening.', price: '₹899', duration: '50 mins' }
    ]
  },
  {
    id: 'spa',
    name: 'Holistic Spa, Waxing & Grooming',
    iconName: 'Flower',
    description: 'Revitalize your body and soul with therapeutic massages, grooming basics, and high-definition lash styling.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'spa-1', name: 'Deep Tissue / Aromatherapy Body Spa', description: 'Full body restorative massage using high-grade organic lavender or sandalwood oils to relieve muscular tension.', price: '₹2,499', duration: '60 mins', isPopular: true },
      { id: 'spa-2', name: 'Luxe Full Body Waxing (Rica / Organic)', description: 'Gentle, pain-minimizing Rica wax treatment that eliminates tanning and leaves skin beautifully soft.', price: '₹1,499', duration: '75 mins' },
      { id: 'spa-3', name: 'Precision Eyebrow & Face Threading', description: 'Detailed brow shaping and organic face threading customized to flatter your face geometry.', price: '₹199', duration: '20 mins' },
      { id: 'spa-4', name: 'Premium Semi-Permanent Eyelash Extensions', description: 'Individual luxury silk lash application for full volume, elegant curl, and a naturally dense frame.', price: '₹2,499', duration: '90 mins' },
      { id: 'spa-5', name: 'Deep Clarifying Back Polish & Scrub', description: 'Exfoliation, steam, blackhead clearing, and nourishing clay wrap for a smooth, spot-free back.', price: '₹1,499', duration: '45 mins' }
    ]
  },
  {
    id: 'packages',
    name: 'Affordable Luxury Packages',
    iconName: 'Gift',
    description: 'Expertly bundled high-end services offering complete beauty transformations and unmatched savings.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    services: [
      { id: 'pkg-1', name: 'Royal Pre-Bridal Package (3-Session Ritual)', description: 'Ultimate bridal prep: 1 Hydra Facial, Full Body Waxing & Polishing, Luxury Hair Spa, Manicure & Pedicure.', price: '₹8,999', duration: '3 Days Ritual', isPopular: true },
      { id: 'pkg-2', name: 'Elite Bride & Groom Combo Package', description: 'Synchronized care: HD Bridal Makeup + Groom Hair Styling, Premium Clean-up, and relaxing Aromatherapy Spa.', price: '₹18,999', duration: 'Two Persons' },
      { id: 'pkg-3', name: "Melody's Signature Glow Package", description: 'Quick makeover: Brightening Gold Facial, Hair Cut, deep conditioning Hair Spa, and standard Threading.', price: '₹3,499', duration: '150 mins', isPopular: true }
    ]
  }
];
