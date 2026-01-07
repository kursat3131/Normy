
import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async getMusicRecommendations(prompt: string): Promise<AISuggestion[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 5 songs for this mood/request: "${prompt}". Provide the song title, artist, and a short reason why it fits.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["title", "artist", "reason"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return [];
    }
  },

  async searchMusicTrivia(songName: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tell me something interesting about the song "${songName}" and its artist. Use Google Search for accuracy.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  }
};
