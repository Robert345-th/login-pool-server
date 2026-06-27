const http = require('http');

// Simple storage for login credentials pool
let loginPool = [
  { id: 1, phone: "26097XXXXX01", status: "Free" },
  { id: 2, phone: "26097XXXXX02", status: "Free" },
  { id: 3, phone: "26097XXXXX03", status: "Free" }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Dashboard endpoint to look at the pool
  if (req.method === 'GET' && req.url === '/pool-state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ pool: loginPool }));
    return;
  }

  // Automation endpoint to request a phone number to login with
  if (req.method === 'POST' && req.url === '/request-login') {
    const freeAccount = loginPool.find(acc => acc.status === 'Free');
    if (freeAccount) {
      freeAccount.status = 'In-Use';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, phone: freeAccount.phone }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: "No free accounts available" }));
    }
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Login pool server running on port ' + PORT));
