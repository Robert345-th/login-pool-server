const http = require('http');

// Simple storage for login credentials pool
let loginPool = [
  { id: 1, phone: "26097XXXXX01", status: "Free" },
  { id: 2, phone: "26097XXXXX02", status: "Free" },
  { id: 3, phone: "26097XXXXX03", status: "Free" }
];

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mwos/Bolabet Withdraw Tracker</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #0b1426; color: white; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 450px; background: #111c32; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f2d4a; padding-bottom: 10px; margin-bottom: 15px; }
        .logo { font-weight: bold; font-size: 18px; color: #fff; }
        .live-badge { background: #10b981; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .main-payout { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 20px; }
        .main-payout h1 { margin: 0; font-size: 48px; }
        .main-payout p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
        .goal-box { background: rgba(0, 0, 0, 0.2); padding: 15px; border-radius: 10px; margin-top: 15px; text-align: left; }
        .progress-bar { background: rgba(255,255,255,0.1); border-radius: 10px; height: 10px; margin: 10px 0; overflow: hidden; }
        .progress-fill { background: white; width: 33%; height: 100%; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
        .stat-card { background: #1f2d4a; padding: 15px; border-radius: 10px; text-align: center; }
        .stat-card div { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
        .stat-card strong { font-size: 20px; }
        .pool-box { background: #13223f; border: 1px solid #1f2d4a; padding: 15px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .pool-status { display: flex; gap: 10px; }
        .badge { padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; }
        .badge-free { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .badge-use { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .btn { padding: 15px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px; }
        .btn-dark { background: #2e3f5f; color: white; }
        .btn-red { background: #ef4444; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">✈️ Mwos/Bolabet<br><span style="font-size:12px;color:#94a3b8;">Withdraw Tracker</span></div>
            <div class="live-badge">● LIVE</div>
        </div>

        <div class="main-payout">
            <h1>300</h1>
            <p>Zambian Kwacha (ZMW)</p>
            <div class="goal-box">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:bold;">
                    <span>🎯 DAILY GOAL</span>
                    <span>300 / 900 ZMW</span>
                </div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <div style="display:flex; justify-content:space-between; font-size:11px; color:#fef3c7;">
                    <span>33%</span>
                    <span>600 ZMW remaining</span>
                </div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card"><div>Cashouts</div><strong>3</strong></div>
            <div class="stat-card"><div>Active Tabs</div><strong>26</strong></div>
            <div class="stat-card"><div>Biggest Win</div><strong>100</strong></div>
        </div>

        <div class="pool-box">
            <div style="font-weight:bold; font-size:14px;">📱 Real-Time Login<br>Pool Status</div>
            <div class="pool-status">
                <span class="badge badge-free" id="free-count">Free: 0</span>
                <span class="badge badge-use" id="use-count">In-Use: 0</span>
            </div>
        </div>

        <div class="btn-row">
            <button class="btn btn-dark">👁️ View IDs & Numbers</button>
            <button class="btn btn-red">🔄 Deposit / Clear</button>
        </div>
    </div>

    <script>
        async function updatePoolDisplay() {
            try {
                const res = await fetch('/pool-state');
                const data = await res.json();
                const free = data.pool.filter(a => a.status === 'Free').length;
                const inUse = data.pool.filter(a => a.status === 'In-Use').length;
                document.getElementById('free-count').innerText = 'Free: ' + free;
                document.getElementById('use-count').innerText = 'In-Use: ' + inUse;
            } catch (e) { console.log("Waiting for backend..."); }
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

  // Serve Dashboard HTML page on main link
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }

  // Dashboard endpoint to get pool states
  if (req.method === 'GET' && req.url === '/pool-state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ pool: loginPool }));
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Login pool server running on port ' + PORT));
