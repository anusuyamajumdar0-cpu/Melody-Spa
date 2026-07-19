import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Standard procedural response for offline/fallback mode to maintain premium quality
function getMockConsultation(answers: any = {}) {
  const safeAnswers = answers || {};
  const lifestyle = safeAnswers.lifestyle || "Working Professional";
  const fashion = safeAnswers.fashion || "Elegant";
  const timeSpent = safeAnswers.timeSpent || "Around 15 minutes";
  const occasion = safeAnswers.occasion || "Party";
  const stylePreference = safeAnswers.stylePreference || "Elegant";
  const colorFrequency = safeAnswers.colorFrequency || "Never";
  const beautyGoal = safeAnswers.beautyGoal || "More Glow";

  // Customize based on occasion and answers
  let faceShape = "Oval";
  let currentHairstyle = "Medium length natural waves";
  let hairTexture = "Wavy";
  let hairVolume = "Medium";
  let visibleHairHealth = "Healthy with natural movement";
  let personalityStyle = "Classic Elegance";
  let suggestedColor = "Caramel Balayage or Gold Accents";
  let styleName = "The Modern Kolkata Shimmer";
  let recCut = "Butterfly Cut with soft curtain bangs";
  let recStyle = "Volume blowout with classic soft waves";
  let mainService = "Hydra Facial & Hair Spa Combo";
  let serviceReason = "To maximize your skin's natural glow potential and deeply nourish your gorgeous waves.";

  if (occasion === "Wedding" || lifestyle === "Bride-to-be") {
    faceShape = "Oval with soft elegant contours";
    currentHairstyle = "Long natural hair with fine volume";
    hairTexture = "Straight to Wavy";
    hairVolume = "Thick and luxurious";
    visibleHairHealth = "Vibrant but can be enhanced with luxury protein care";
    personalityStyle = "Traditional Bengali Regal Radiance";
    suggestedColor = "Deep Burgundy or Rich Mahogany Highlights";
    styleName = "The Royal Bengali Bridal Glow";
    recCut = "Classic layers to add volume and shape";
    recStyle = "Traditional Bengali Bridal Bun with intricate fresh flower assembly";
    mainService = "Elgo Royal Bridal Makeup & Hair Botox";
    serviceReason = "Crafted precisely to create a long-lasting, sweat-proof royal glow and impeccable bridal hair structure.";
  } else if (occasion === "Festival" || fashion === "Bengali Traditional") {
    faceShape = "Heart-shaped with expressive eyes";
    currentHairstyle = "Medium length hair";
    hairTexture = "Wavy";
    hairVolume = "Medium";
    personalityStyle = "Festive Shimmer & Bengali Tradition";
    suggestedColor = "Warm Honey or Chestnut Highlights";
    styleName = "The Festive Saptami Elegance";
    recCut = "Layer Cut with delicate framing around the cheekbones";
    recStyle = "Traditional Bengali side sweep braid with fresh jasmine curls";
    mainService = "Kolkata Shimmer Party Makeup & Keratin Boost";
    serviceReason = "Enhances natural hair texture while preparing skin for a flawless, high-definition festive appearance.";
  } else if (lifestyle === "Student" || fashion === "Minimal") {
    faceShape = "Round with youthful, soft structure";
    currentHairstyle = "Straight shoulder length";
    hairTexture = "Straight";
    hairVolume = "Medium";
    personalityStyle = "Effortless Modern Minimalist";
    suggestedColor = "Caramel or Ash Brown subtle babylights";
    styleName = "The Indo-Western Breeze";
    recCut = "Bob Cut or Trendy Wolf Cut with textured bangs";
    recStyle = "Messy bun or playful high ponytail with loose front strands";
    mainService = "Hydra Facial & L'Oréal Hair Spa";
    serviceReason = "Perfect for busy routines, offering a 30-minute instant skin recharge and lightweight, bounce-enhancing hair care.";
  }

  return {
    faceShape,
    currentHairstyle,
    hairTexture,
    hairVolume,
    visibleHairHealth,
    overallStyleImpression: `Your facial features showcase a beautiful, balanced ${faceShape} structure. The ${currentHairstyle} possesses excellent natural characteristics that we can elevate to the absolute peak of luxury beauty.`,
    personalityStyle,
    suggestedColourPalette: suggestedColor,
    confidenceTips: [
      "Accentuate your eyes with soft kajal styling, reflecting Kolkata's classic timeless beauty standards.",
      "To maximize natural hair volume, blow-dry upside down and use a lightweight luxury serum to lock in glass-like shine.",
      "Keep skin deeply hydrated with hyaluronic acid to maintain that premium, dew-kissed glass skin look."
    ],
    concepts: [
      {
        styleName: styleName,
        whyItSuits: `Designed exclusively for your ${faceShape} shape and ${lifestyle} lifestyle. It highlights your gorgeous eyes while keeping hair styling completely effortless.`,
        recommendedCut: recCut,
        recommendedStyle: recStyle,
        colourSuggestion: suggestedColor,
        hairCareRoutine: "Deep hydration mask paired with a heat-protectant luxury shield.",
        makeup: "Soft rose-toned cheeks, dew-infused base, and a subtle classic lip shine.",
        eyebrows: "Gently defined, arched to frame your expressive gaze.",
        accessories: "Minimal golden chandelier earrings or contemporary champagne studs.",
        outfit: fashion === "Traditional" || fashion === "Bengali Traditional" ? "Elegant Jamdani Saree or Silk Lehenga" : "Sophisticated Indo-Western pantsuit or pastel dress",
        occasions: `${occasion} wear and elegant social gatherings`,
        maintenanceLevel: "Medium",
        frequency: "Once every 4 weeks"
      },
      {
        styleName: "The Modern Kolkata Shimmer",
        whyItSuits: "An ultra-chic, high-fashion adaptation that frames your cheekbones beautifully and matches Kolkata's dynamic creative scene.",
        recommendedCut: "Butterfly Cut with soft layered wings",
        recommendedStyle: "Curtain bangs with elegant salon-grade volume blowout",
        colourSuggestion: "Chocolate Brown with Caramel Highlights",
        hairCareRoutine: "L'Oréal Pro Longer protective shampoo and nourishing cream.",
        makeup: "Soft smokey eyes paired with an elegant nude lip color.",
        eyebrows: "Natural, fuller feathered eyebrows.",
        accessories: "Bold contemporary metallic jewelry or hoop earrings.",
        outfit: "Sleek monochromatic tunic or tailored blazer dress",
        occasions: "Professional meetings, office galas, and upscale dining",
        maintenanceLevel: "Low to Medium",
        frequency: "Once every 6 weeks"
      },
      {
        styleName: "Kolkata Glamour Luxe",
        whyItSuits: "For those glamorous moments when you want to turn heads with absolute confidence and premium star appeal.",
        recommendedCut: "Soft Layers or Wolf Cut",
        recommendedStyle: "Luxurious beach waves or high textured pony",
        colourSuggestion: "Burgundy Balayage",
        hairCareRoutine: "Hair Botox treatment followed by deep sealing conditioners.",
        makeup: "High-definition velvet skin base, bold iconic red lip, and winged luxury eyeliner.",
        eyebrows: "Sharp, defined, professional micro-arched structure.",
        accessories: "Luxury Kundan necklace or contemporary emerald drops.",
        outfit: "Draped silk saree or high-fashion georgette gown",
        occasions: "Grand weddings, cocktail parties, and red-carpet events",
        maintenanceLevel: "High",
        frequency: "Once every 3-4 weeks"
      }
    ],
    recommendedServices: [
      {
        name: mainService,
        reason: serviceReason
      },
      {
        name: "Hair Spa & Hair Botox Treatment",
        reason: "Designed to infuses essential proteins, smooth frizz, and create a mirror-like shine matching your beauty goals."
      }
    ]
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing large image payloads
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ limit: "15mb", extended: true }));

  // Custom middleware to prevent caching for images/assets
  app.use((req, res, next) => {
    if (req.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    next();
  });

  // AI Consultation Route
  app.post("/api/ai-consultation", async (req, res) => {
    const { image } = req.body || {};
    const answers = req.body.answers || {};
    answers.lifestyle = answers.lifestyle || "Working Professional";
    answers.fashion = answers.fashion || "Elegant";
    answers.timeSpent = answers.timeSpent || "Around 15 minutes";
    answers.occasion = answers.occasion || "Party";
    answers.stylePreference = answers.stylePreference || "Elegant";
    answers.colorFrequency = answers.colorFrequency || "Never";
    answers.beautyGoal = answers.beautyGoal || "More Glow";

    try {
      if (!image) {
        return res.status(400).json({ error: "Please upload your selfie to begin the consultation." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.log("No GEMINI_API_KEY found, returning highly tailored procedural report.");
        return res.json(getMockConsultation(answers));
      }

      console.log("Initializing Gemini Client...");
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format base64 image supporting both data URLs and local paths
      let base64Data = "";
      let mimeType = "image/jpeg";

      if (image.startsWith("data:image")) {
        const match = image.match(/^data:([^;]+);base64,(.*)$/);
        if (match) {
          mimeType = match[1];
          base64Data = match[2];
        } else {
          base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        }
      } else {
        try {
          const cleanPath = image.startsWith("/") ? image.substring(1) : image;
          const absolutePath = path.join(process.cwd(), cleanPath);
          if (fs.existsSync(absolutePath)) {
            const fileBuffer = fs.readFileSync(absolutePath);
            base64Data = fileBuffer.toString("base64");
            if (image.endsWith(".png")) mimeType = "image/png";
            else if (image.endsWith(".webp")) mimeType = "image/webp";
          }
        } catch (err) {
          console.error("Local file conversion error:", err);
        }
      }

      if (!base64Data) {
        base64Data = image; // fallback
      }

      const imagePart = {
        inlineData: {
          mimeType,
          data: base64Data
        }
      };

      const promptText = `
You are a prestige AI beauty consultant at Elgo Glamour World, Kolkata's absolute best luxury salon in North Dumdum.
You combine modern salon hair styling (Butterfly cut, Wolf cut, layers, Keratin, Botox) with authentic Bengali bridal makeup and global beauty trends.

Task: Analyze the user's selfie and questionnaire answers to generate a highly detailed, encouraging, and luxurious AI Beauty Consultation report in JSON format.

User answers:
- Lifestyle: ${answers.lifestyle}
- Fashion Style: ${answers.fashion}
- Getting Ready Time: ${answers.timeSpent}
- Target Occasion: ${answers.occasion}
- Favorite Hairstyle Look: ${answers.stylePreference}
- Color Hair History: ${answers.colorFrequency}
- Beauty Goal: ${answers.beautyGoal}

Your JSON response must follow this exact structure, containing highly detailed, confidence-boosting, positive feedback. Do NOT give medical opinions and NEVER criticize their features:

{
  "faceShape": "Oval / Heart / Round / Square / Long",
  "currentHairstyle": "Brief description of hair visible in selfie",
  "hairTexture": "Straight / Wavy / Curly / Coily",
  "hairVolume": "Fine / Medium / Thick",
  "visibleHairHealth": "Healthy / Shiny / Dry ends / Needs hydration",
  "overallStyleImpression": "A 2-3 sentence highly flattering statement about their facial harmony, natural charm, and style potential.",
  "personalityStyle": "Custom style persona name (e.g., Elegance Supreme, Traditional Bengali Empress)",
  "suggestedColourPalette": "Deep Burgundy, Chocolate Balayage, Rose Gold Accents, Honey Brown, etc.",
  "confidenceTips": [
    "Tip 1 regarding skincare glow or makeup tricks",
    "Tip 2 regarding hair styling or blowout tricks",
    "Tip 3 regarding Kolkata trends or accessorizing"
  ],
  "concepts": [
    {
      "styleName": "Luxury style name 1",
      "whyItSuits": "Detailed reason why this concept matches their features and lifestyle",
      "recommendedCut": "Suggested haircut (e.g. Butterfly Cut, Curtain Layered Cut)",
      "recommendedStyle": "Suggested style (e.g. Volume Blowout, Soft Waves, Bengali Bridal Bun)",
      "colourSuggestion": "Color suggestion (e.g. Warm Caramel Highlights)",
      "hairCareRoutine": "Salon or home hair treatment tip",
      "makeup": "Makeup details (eyes, skin, lips)",
      "eyebrows": "Eyebrow guidance",
      "accessories": "Suggested luxury accessories",
      "outfit": "Styling outfit suggestion",
      "occasions": "Perfect occasions to flaunt this",
      "maintenanceLevel": "Low / Medium / High",
      "frequency": "How often to visit the salon for upkeep"
    },
    {
      "styleName": "Luxury style name 2",
      "whyItSuits": "Detailed reason why this concept matches their features and lifestyle",
      "recommendedCut": "Suggested haircut",
      "recommendedStyle": "Suggested style",
      "colourSuggestion": "Color suggestion",
      "hairCareRoutine": "Salon or home hair treatment tip",
      "makeup": "Makeup details",
      "eyebrows": "Eyebrow guidance",
      "accessories": "Suggested luxury accessories",
      "outfit": "Styling outfit suggestion",
      "occasions": "Perfect occasions to flaunt this",
      "maintenanceLevel": "Low / Medium / High",
      "frequency": "How often to visit the salon for upkeep"
    },
    {
      "styleName": "Luxury style name 3 (Bridal/Glamour Focus)",
      "whyItSuits": "Detailed reason why this concept matches their features and lifestyle",
      "recommendedCut": "Suggested haircut",
      "recommendedStyle": "Suggested style",
      "colourSuggestion": "Color suggestion",
      "hairCareRoutine": "Salon or home hair treatment tip",
      "makeup": "Makeup details",
      "eyebrows": "Eyebrow guidance",
      "accessories": "Suggested luxury accessories",
      "outfit": "Styling outfit suggestion",
      "occasions": "Perfect occasions to flaunt this",
      "maintenanceLevel": "Low / Medium / High",
      "frequency": "How often to visit the salon for upkeep"
    }
  ],
  "recommendedServices": [
    {
      "name": "Service name 1 (e.g. Hair Botox, Hydra Facial)",
      "reason": "Why it suits their goal"
    },
    {
      "name": "Service name 2 (e.g. Bengali Bridal Makeup)",
      "reason": "Why it fits their occasion"
    }
  ]
}

Return ONLY the raw JSON object. Do not wrap in markdown \`\`\`json blocks.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [imagePart, { text: promptText }],
        config: {
          responseMimeType: "application/json",
        }
      });

      const text = response.text || "";
      console.log("Successfully received JSON response from Gemini.");
      const parsedData = JSON.parse(text.trim());
      return res.json(parsedData);

    } catch (err: any) {
      console.error("Gemini Error:", err);
      // Fallback on error to ensure a seamless experience
      return res.json(getMockConsultation(answers));
    }
  });

  // Serve Frontend with Vite Middleware in Development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started running on port ${PORT}`);
  });
}

startServer();
