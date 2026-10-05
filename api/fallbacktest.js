export default async function handler(req,res){
  try{
    const r=await fetch('https://ai-gateway.vercel.sh/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+process.env.AI_GATEWAY_API_KEY
      },
      body:JSON.stringify({
        model:'google/gemini-3.6-flash',
        messages:[{role:'user',content:'請只回答 OK'}],
        max_tokens:50,
        temperature:0
      })
    });
    const j=await r.json();
    if(!r.ok) return res.status(r.status).json({ok:false,error:j?.error?.message||'gateway_failed'});
    return res.status(200).json({ok:true,text:j?.choices?.[0]?.message?.content||''});
  }catch(e){
    console.error(e);
    return res.status(500).json({ok:false,error:'exception'});
  }
}