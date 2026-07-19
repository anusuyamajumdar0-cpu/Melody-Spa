import { useEffect } from 'react';

export default function SEO() {
  useEffect(() => {
    // 1. Update Document Title
    document.title = "Melody's Spa & Family Salon | Premium Unisex Family Salon in Garia, Kolkata";

    // 2. Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Melody\'s Spa & Family Salon is Garia, Kolkata\'s top unisex luxury spa and family salon. Discover expert hair spas, Hydra Facials, bridal makeovers, body massages, nail art, and keratin treatments.');

    // 3. Set Open Graph (OG) and Twitter Card tags
    const ogTags = [
      { property: 'og:title', content: 'Melody\'s Spa & Family Salon | Premium Family Salon & Spa Garia' },
      { property: 'og:description', content: 'Experience elite hair treatments, advanced facials, wellness massages, and gorgeous bridal makeovers near Garia Station, Kolkata.' },
      { property: 'og:type', content: 'business.business' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Melody\'s Spa & Family Salon | Luxury Unisex Salon Garia' },
      { name: 'twitter:description', content: 'Premium family salon & spa in Garia offering hair botox, hydra facial, and airbrush bridal makeups.' }
    ];

    ogTags.forEach(tag => {
      const attr = tag.property ? 'property' : 'name';
      const attrVal = tag.property || tag.name || '';
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // 4. Inject JSON-LD Schema
    const schemas = [
      // LocalBusiness / BeautySalon Schema
      {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": "https://melodyspafamilysalon.co.in/#salon",
        "name": "Melody's Spa & Family Salon",
        "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
        "logo": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200",
        "url": window.location.href,
        "telephone": "+917980874963",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Garia Station Road, beside Garia Station Road Post Office",
          "addressLocality": "Garia, Kolkata",
          "addressRegion": "West Bengal",
          "postalCode": "700084",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.4646", // Representative Garia coordinate
          "longitude": "88.3813"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "20:30"
        },
        "sameAs": [
          "https://www.facebook.com/MelodysSpaFamilySalon",
          "https://www.instagram.com/MelodysSpaFamilySalon"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "976"
        }
      },
      // FAQ Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where is Melody's Spa & Family Salon located in Garia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Melody's Spa & Family Salon is located on Garia Station Road, beside Garia Station Road Post Office, Garia, Kolkata, West Bengal 700084. We are easily accessible, just a 2-minute walk from Garia Railway Station and close to Kavi Nazrul Metro."
            }
          },
          {
            "@type": "Question",
            "name": "What makeups do you offer for brides in Kolkata?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We specialize in luxury High-Definition (HD) and Airbrush Bridal Makeups. Our wedding makeovers feature hair styling, saree/lehenga draping, and accessory settings using global brands like Mac, Estée Lauder, and Huda Beauty."
            }
          }
        ]
      }
    ];

    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.id = 'seo-structured-data';
    scriptEl.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(scriptEl);

    return () => {
      const existingScript = document.getElementById('seo-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
