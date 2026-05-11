// ============================================================
//  proxy-server.js - 本地CORS代理服务器
//  解决浏览器直接调用智谱AI API的跨域限制
//  启动方式: node proxy-server.js
//  代理地址: http://localhost:3456/api/chat
// ============================================================

const http = require('http');
const https = require('https');

const PORT = 3456;
const TARGET_HOST = 'open.bigmodel.cn';
const TARGET_PATH = '/api/paas/v4/chat/completions';

const server = http.createServer(function(req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: 'Not Found. Use POST /api/chat'}));
    return;
  }

  // 收集请求体
  var body = [];
  req.on('data', function(chunk) { body.push(chunk); });
  req.on('end', function() {
    var bodyStr = Buffer.concat(body).toString();

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
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', function(err) {
      console.error('Proxy error:', err.message);
      res.writeHead(502, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
      res.end(JSON.stringify({error: 'Proxy request failed: ' + err.message}));
    });

    proxyReq.write(bodyStr);
    proxyReq.end();
  });
});

server.listen(PORT, function() {
  console.log('=================================');
  console.log('  CORS Proxy Server Running');
  console.log('  http://localhost:' + PORT + '/api/chat');
  console.log('=================================');
  console.log('Forward to: https://' + TARGET_HOST + TARGET_PATH);
  console.log('Press Ctrl+C to stop');
});
