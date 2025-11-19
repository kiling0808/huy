import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserMeasurements, AnalysisResult, SkinTone } from "../types";

export const analyzeStyleWithGemini = async (user: UserMeasurements): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    console.error("API Key missing");
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as a world-class fashion stylist.
    Analyze the user based on these metrics:
    Name: ${user.name}
    Gender: ${user.gender}
    Height: ${user.height}cm
    Weight: ${user.weight}kg
    Chest: ${user.chest}cm
    Waist: ${user.waist}cm
    Hips: ${user.hip}cm
    Skin Tone: ${user.skinTone}

    1. Determine their body shape (e.g., Pear, Hourglass, Rectangle, Apple, Inverted Triangle for women; Trapezoid, Rectangle, Oval, Triangle for men).
    2. Provide a brief styling advice summary customized to their gender, body shape, and skin tone.
    3. Suggest 3 specific clothing products (A Top, A Bottom, and one other item like a Dress/Suit/Accessory) that would flatter them.
    
    Return the response in strict JSON format.
  `;

  const productSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      category: { type: Type.STRING, enum: ['Top', 'Bottom', 'Dress', 'Shoes', 'Accessory'] },
      buyUrl: { type: Type.STRING },
    },
    required: ["id", "name", "description", "category", "buyUrl"],
  };

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      bodyShape: { type: Type.STRING },
      advice: { type: Type.STRING },
      recommendations: {
        type: Type.ARRAY,
        items: productSchema,
      },
    },
    required: ["bodyShape", "advice", "recommendations"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a helpful, polite, and expert fashion consultant. Your goal is to make the user feel confident.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data if API fails
    return {
      bodyShape: "Calculated (Offline)",
      advice: "We couldn't reach our AI stylist right now, but based on your measurements, focus on balancing your proportions.",
      recommendations: [
        {
            id: "1",
            name: "Classic Fit Shirt",
            description: "A versatile staple.",
            category: "Top",
            buyUrl: "#"
        },
        {
            id: "2",
            name: "Straight Leg Jeans",
            description: "Timeless and flattering.",
            category: "Bottom",
            buyUrl: "#"
        },
        {
            id: "3",
            name: "Leather Belt",
            description: "Adds a finishing touch.",
            category: "Accessory",
            buyUrl: "#"
        }
      ]
    };
  }
};