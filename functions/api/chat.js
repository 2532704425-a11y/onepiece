// ============================================================
//  functions/api/chat.js - Cloudflare Pages Function
//  替代本地 proxy-server.js，解决浏览器调用智谱AI API的跨域限制
//  Cloudflare Pages 会自动将 /api/chat 路由到此函数
// ============================================================

const TARGET_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// CORS 响应头
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// 处理 OPTIONS 预检请求
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// 处理 POST 请求
export async function onRequestPost(context) {
  try {
    const request = context.request;
    const body = await request.text();

    // 转发请求到智谱AI
    const response = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: body,
    });

    // 读取响应
    const responseBody = await response.text();

    // 返回带 CORS 头的响应
    return new Response(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Proxy request failed: ' + err.message }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    });
  }
}
