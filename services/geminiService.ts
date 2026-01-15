import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBirthdayOracle = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a short, funny, and specific prediction for Mahnoor's 19th birthday. She loves Mobile Legends (MLBB), cats, and food. Write it in the voice of her close desi best friend: casual, use Roman Urdu slang (like 'yaar', 'sachi', 'scene', 'bas', 'kasam se'). Lowercase. No punctuation at the end. Roast her slightly. Strictly NO generic AI words like 'unleash', 'embrace', 'sparkle'. Max 1 emoji. Topics: losing ranked matches because of feeding, cats ignoring her, or eating too much biryani. Example: 'yaar knowing you, you're gonna hit mythic today only to lose it tomorrow'",
      config: {
        temperature: 1.2,
      }
    });

    return response.text || "yaar you're gonna get that savage in mlbb today, bas lag na karwana 🎮";
  } catch (error) {
    console.error("Gemini Oracle Error:", error);
    return "the cat distribution system finally found you, mubarak ho 🐱";
  }
};