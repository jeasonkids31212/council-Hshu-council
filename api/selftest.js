import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  try {
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ok:false,error:'missing_key'});
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    for (const model of ['gemini-3.8-flash','gemini-3.6-flash']) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: '請只回答：OK',
          config: { maxOutputTokens: 100, temperature: 0, thinkingConfig: { thinkingLevel: 'LOW' } }
        });
        const text = (response.text || '').trim();
        if (text) return res.status(200).json({ok:true, model, text});
      } catch (e) {
        console.error('selftest model failed', model, e);
      }
    }
    return res.status(500).json({ok:false,error:'gemini_failed'});
  } catch (e) {
    console.error(e);
    return res.status(500).json({ok:false,error:'gemini_failed'});
  }
}
