const http = require('http');

// Live login pool from Column 1 of your notebook
let loginPool = [
  { id: 1, phone: "0763207608", password: "R0978012009", status: "Free" },
  { id: 2, phone: "0760017804", password: "R0978012009", status: "Free" },
  { id: 3, phone: "0760657740", password: "R0978012009", status: "Free" },
  { id: 4, phone: "0964367610", password: "R0978012009", status: "Free" },
  { id: 5, phone: "0760027462", password: "R0978012009", status: "Free" }
];

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Credentials Pool</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b1426; color: white; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 500px; background: #111c32; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .header { border-bottom: 1px solid #1f2d4a; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-weight: bold; font-size: 20px; color: #fff; letter-spacing: 0.5px; }
        .subtitle { font-size: 12px; color: #94a3b8; margin-top: 4px; }
        .live-badge { background: #10b981; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .pool-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .account-card { background: #1f2d4a; border: 1px solid #2e3f5f; padding: 15px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; }
        .acc-details { display: flex; flex-direction: column; gap: 4px; }
        .acc-phone { font-size: 16px; font-weight: bold; color: #f3f4f6; }
        .acc-pass { font-size: 13px; color: #94a3b8; font-family: monospace; }
        .status-badge { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .status-free { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
        .status-use { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
        .summary-bar { background: #13223f; border: 1px solid #1f2d4a; padding: 12px; border-radius: 10px; text-align: center; font-size: 14px; font-weight: bold; color: #94a3b8; }
        .summary-bar span { color: #34d399; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <div class="logo">🔑 Login Pool Manager</div>
                <div class="subtitle">Credentials Storage & Automation Router</div>
            </div>
            <div class="live-badge">● ONLINE</div>
        </div>

        <div class="pool-list" id="pool-container"></div>

        <div class="summary-bar" id="summary-text">Loading pool statuses...</div>
    </div>

    <script>
        async function updatePoolDisplay() {
            try {
                const res = await fetch('/pool-state');
                const data = await res.json();
                const container = document.getElementById('pool-container');
                container.innerHTML = '';
                let freeCount = 0;
                
                data.pool.forEach(acc => {
                    if(acc.status === 'Free') freeCount++;
                    const card = document.createElement('div');
                    card.className = 'account-card';
                    card.innerHTML = `
                        <div class="acc-details">
                            <div class="acc-phone">📱 \${acc.phone}</div>
                            <div class="acc-pass">🔑 Pass: \${acc.password}</div>
                        </div>
                        <div class="status-badge \${acc.status === 'Free' ? 'status-free' : 'status-use'}">
                            \${acc.status}
                        </div>
                    `;
                    container.appendChild(card);
                });
                document.getElementById('summary-text').innerHTML = 
                    \`Total Configured Accounts: \${data.pool.length} | Available: <span>\${freeCount} Free</span>\`;
            } catch (e) { document.getElementById('summary-text').innerText = "Connecting to credentials system..."; }
        }
        setInterval(updatePoolDisplay, 2000);
        updatePoolDisplay();
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }

  if (req.method === 'GET' && req.url === '/pool-state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ pool: loginPool }));
    return;
  }

  if (req.method === 'POST' && req.url === '/request-login') {
    const freeAccount = loginPool.find(acc => acc.status === 'Free');
    if (freeAccount) {
      freeAccount.status = 'In-Use';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, phone: freeAccount.phone, password: freeAccount.password }));
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
