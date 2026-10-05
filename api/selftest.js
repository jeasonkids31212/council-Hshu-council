import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  try {
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ok:false,error:'missing_key'});
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Reply exactly with OK',
      config: { maxOutputTokens: 10, temperature: 0 }
    });
    const text = response.text || '';
    return res.status(200).json({ok:text.trim()==='OK', text:text.trim()});
  } catch (e) {
    console.error(e);
    return res.status(500).json({ok:false,error:'gemini_failed'});
  }
}
