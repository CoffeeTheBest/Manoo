import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBirthdayOracle = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a short, meaningful, Shakespearean-style free verse poem for Mahnoor who is turning 19 today. It does not need to rhyme, but should sound wise, elegant, and whimsical. Focus on her beauty, spirit, and the magic of youth. Keep it under 50 words. Use emojis.",
      config: {
        temperature: 1,
      }
    });

    return response.text || "Nineteen springs hath graced thy spirit bright, / Like stars that dance upon the velvet night. / May joy pursue thee, swift as morning light, / And fortune bless thee with its golden might. ✨🌹🌙";
  } catch (error) {
    console.error("Gemini Oracle Error:", error);
    return "The stars align to sing of thy grace, / A new year dawns upon thy lovely face. 🌟✨";
  }
};