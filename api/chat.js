// ============================================================
//  api/chat.js - Vercel Serverless Function
//  替代本地 proxy-server.js，解决浏览器调用智谱AI API的跨域限制
//  Vercel 会自动将 /api/chat 路由到此函数
// ============================================================

const https = require('https');

const TARGET_HOST = 'open.bigmodel.cn';
const TARGET_PATH = '/api/paas/v4/chat/completions';

module.exports = function(req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 预检请求
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(404).json({ error: 'Not Found. Use POST /api/chat' });
    return;
  }

  // Vercel 已自动解析 body，需要重新序列化
  var bodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

  var options = {
    hostname: TARGET_HOST,
    path: TARGET_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization'] || '',
      'Content-Length': Buffer.byteLength(bodyStr)
    }
  };

  var proxyReq = https.request(options, function(proxyRes) {
    // 收集响应数据
    var chunks = [];
    proxyRes.on('data', function(chunk) { chunks.push(chunk); });
    proxyRes.on('end', function() {
      var body = Buffer.concat(chunks).toString();
      res.status(proxyRes.statusCode)
        .setHeader('Content-Type', 'application/json')
        .end(body);
    });
  });

  proxyReq.on('error', function(err) {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'Proxy request failed: ' + err.message });
  });

  proxyReq.write(bodyStr);
  proxyReq.end();
};
