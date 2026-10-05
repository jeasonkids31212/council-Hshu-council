export default async function handler(req, res) {
  const token = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  if (!token) return res.status(500).json({ ok:false, error:'no_token' });
  try {
    const r = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
      method:'POST',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
      body:JSON.stringify({
        model:'openai/gpt-5.6-sol',
        instructions:'Reply exactly: OK',
        input:'test',
        max_output_tokens:10
      })
    });
    const body = await r.json();
    return res.status(r.ok?200:502).json({ok:r.ok,status:r.status,output_text:body.output_text||null,error:body.error?.message||null});
  } catch(e) {
    return res.status(500).json({ok:false,error:String(e)});
  }
}