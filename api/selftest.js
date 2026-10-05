import { generateText } from 'ai';

export default async function handler(req, res) {
  try {
    const { text } = await generateText({
      model: 'openai/gpt-5.6-sol',
      prompt: 'Reply exactly: OK',
      maxOutputTokens: 10
    });
    res.status(200).json({ ok: text.trim() === 'OK', text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'ai_failed' });
  }
}
