import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, you should proxy these requests through your backend
// to protect your API key. For this demo, we use process.env.API_KEY.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeViolationReport = async (
  productName: string,
  reportedPrice: number,
  officialPrice: number,
  description: string
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      You are an AI assistant for the Consumer Protection Association in Taiz, Yemen.
      Analyze the following violation report:
      
      Product: ${productName}
      Official Price: ${officialPrice} YR
      Reported Price: ${reportedPrice} YR
      User Description: ${description}
      
      Please provide a brief assessment (max 50 words) in Arabic. 
      1. Calculate the percentage increase if applicable.
      2. Classify severity (Low, Medium, High).
      3. Recommend an immediate action for the admin.
      
      Format the output as plain text.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "تعذر تحليل البيانات حالياً.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "حدث خطأ أثناء الاتصال بالمساعد الذكي.";
  }
};