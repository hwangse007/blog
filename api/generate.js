// Vercel Serverless Function
// 이 서버가 사장님의 Claude API 키를 안전하게 들고 있고,
// 가족/친구는 "공용 비밀번호"만 입력하면 그 키를 대신 사용해서 글을 생성합니다.
// API 키는 절대 브라우저(사용자)에게 노출되지 않습니다.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }

  const { password, payload } = req.body || {};

  if (!process.env.ACCESS_PASSWORD) {
    return res.status(500).json({ error: '서버에 ACCESS_PASSWORD 환경변수가 설정되지 않았어요.' });
  }
  if (password !== process.env.ACCESS_PASSWORD) {
    return res.status(401).json({ error: '비밀번호가 틀렸어요.' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: '서버에 ANTHROPIC_API_KEY 환경변수가 설정되지 않았어요.' });
  }
  if (!payload) {
    return res.status(400).json({ error: '요청 내용이 비어있어요.' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || '알 수 없는 오류가 발생했어요.' });
  }
}
