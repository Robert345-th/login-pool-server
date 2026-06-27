const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Built-in CORS headers configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// --- CENTRAL CREDENTIAL STORAGE POOL ---
let accounts = [
    { phone: "0763207608", password: "R0978012009", status: "FREE" },
    { phone: "0760017804", password: "R0978012009", status: "FREE" },
    { phone: "0760657740", password: "R0978012009", status: "FREE" },
    { phone: "0964367610", password: "R0978012009", status: "FREE" },
    { phone: "0760027462", password: "R0978012009", status: "FREE" },
    { phone: "074623467", password: "R0978012009", status: "FREE" },
    { phone: "077263261", password: "R0978012009", status: "FREE" },
    { phone: "074960432", password: "R0978012009", status: "FREE" },
    { phone: "074040623", password: "R0978012009", status: "FREE" },
    { phone: "074623403", password: "R0978012009", status: "FREE" },
    { phone: "074576605", password: "R0978012009", status: "FREE" },
    { phone: "074604316", password: "R0978012009", status: "FREE" },
    { phone: "074219917", password: "R0978012009", status: "FREE" },
    { phone: "074238215", password: "R0978012009", status: "FREE" },
    { phone: "078227919", password: "R0978012009", status: "FREE" },
    { phone: "074555706", password: "R0978012009", status: "FREE" },
    { phone: "073164197", password: "R0978012009", status: "FREE" },
    { phone: "074138374", password: "R0978012009", status: "FREE" },
    { phone: "074559302", password: "R0978012009", status: "FREE" },
    { phone: "074153025", password: "R0978012009", status: "FREE" },
    { phone: "0779171327", password: "R0978012009", status: "FREE" },
    { phone: "074084958", password: "R0978012009", status: "FREE" },
    { phone: "074641548", password: "R0978012009", status: "FREE" },
    { phone: "074641543", password: "R0978012009", status: "FREE" },
    { phone: "074940273", password: "R0978012009", status: "FREE" },
    { phone: "0778301604", password: "R0978012009", status: "FREE" },
    { phone: "074976516", password: "R0978012009", status: "FREE" },
    { phone: "074638143", password: "R0978012009", status: "FREE" },
    { phone: "0779171438", password: "R0978012009", status: "FREE" },
    { phone: "074987429", password: "R0978012009", status: "FREE" },
    { phone: "074607021", password: "R0978012009", status: "FREE" },
    { phone: "074238234", password: "R0978012009", status: "FREE" },
    { phone: "074219916", password: "R0978012009", status: "FREE" },
    { phone: "074153094", password: "R0978012009", status: "FREE" },
    { phone: "074987395", password: "R0978012009", status: "FREE" },
    { phone: "074203227", password: "R0978012009", status: "FREE" },
    { phone: "074191028", password: "R0978012009", status: "FREE" },
    { phone: "074976555", password: "R0978012009", status: "FREE" },
    { phone: "0770942244", password: "R0978012009", status: "FREE" },
    { phone: "074076004", password: "R0978012009", status: "FREE" },
    { phone: "074219718", password: "R0978012009", status: "FREE" },
    { phone: "073213942", password: "R0978012009", status: "FREE" },
    { phone: "074238217", password: "R0978012009", status: "FREE" },
    { phone: "074048581", password: "R0978012009", status: "FREE" },
    { phone: "074145028", password: "R0978012009", status: "FREE" },
    { phone: "074219788", password: "R0978012009", status: "FREE" },
    { phone: "074153033", password: "R0978012009", status: "FREE" },
    { phone: "074219794", password: "R0978012009", status: "FREE" },
    { phone: "074111365", password: "R0978012009", status: "FREE" },
    { phone: "074093035", password: "R0978012009", status: "FREE" },
    { phone: "074960438", password: "R0978012009", status: "FREE" },
    { phone: "074219730", password: "R0978012009", status: "FREE" },
    { phone: "076604329", password: "R0978012009", status: "FREE" },
    { phone: "073135488", password: "R0978012009", status: "FREE" },
    { phone: "074138371", password: "R0978012009", status: "FREE" },
    { phone: "074604322", password: "R0978012009", status: "FREE" },
    { phone: "073384775", password: "R0978012009", status: "FREE" },
    { phone: "071460072", password: "R0978012009", status: "FREE" },
    { phone: "0953658753", password: "R0978012009", status: "FREE" },
    { phone: "074219985", password: "R0978012009", status: "FREE" },
    { phone: "074987469", password: "R0978012009", status: "FREE" },
    { phone: "074604327", password: "R0978012009", status: "FREE" },
    { phone: "074987438", password: "R0978012009", status: "FREE" },
    { phone: "074195196", password: "R0978012009", status: "FREE" },
    { phone: "074976632", password: "R0978012009", status: "FREE" },
    { phone: "074987388", password: "R0978012009", status: "FREE" },
    { phone: "074576597", password: "R0978012009", status: "FREE" },
    { phone: "074086452", password: "R0978012009", status: "FREE" },
    { phone: "074939790", password: "R0978012009", status: "FREE" },
    { phone: "074153031", password: "R0978012009", status: "FREE" },
    { phone: "074960435", password: "R0978012009", status: "FREE" },
    { phone: "074638147", password: "R0978012009", status: "FREE" },
    { phone: "074555680", password: "R0978012009", status: "FREE" },
    { phone: "074219908", password: "R0978012009", status: "FREE" },
    { phone: "074195202", password: "R0978012009", status: "FREE" },
    { phone: "074940262", password: "R0978012009", status: "FREE" },
    { phone: "074976553", password: "R0978012009", status: "FREE" },
    { phone: "074203235", password: "R0978012009", status: "FREE" }
];

// --- DASHBOARD UI HTML ---
app.get('/', (req, res) => {
    const totalAccounts = accounts.length;
    const freeAccounts = accounts.filter(acc => acc.status === 'FREE').length;

    let accountCards = accounts.map(acc => `
        <div style="background:#1e293b; padding:15px; margin:10px 0; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid #334155;">
            <div>
                <div style="color:#f8fafc; font-weight:bold; font-size:1.1em;">📱 ${acc.phone}</div>
                <div style="color:#94a3b8; font-size:0.9em; margin-top:4px;">🔑 Pass: ${acc.password}</div>
            </div>
            <span style="background:${acc.status === 'FREE' ? '#065f46' : '#1e3a8a'}; color:${acc.status === 'FREE' ? '#34d399' : '#93c5fd'}; padding:6px 12px; border-radius:6px; font-weight:bold; font-size:0.85em; text-transform:uppercase;">
                ${acc.status}
            </span>
        </div>
    `).join('');

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login Pool Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: sans-serif; background: #0f172a; color: #e2e8f0; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .badge { background: #10b981; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; }
            .stats-bar { background: #1e293b; padding: 15px; border-radius: 10px; text-align: center; font-weight: bold; margin-bottom: 20px; border: 1px solid #334155; }
            .btn-reset { display: block; width: 100%; background: #ef4444; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; font-size: 1em; cursor: pointer; margin-bottom: 25px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 style="color:#f1f5f9; margin-bottom:5px;">🔑 Login Pool Manager</h1>
            <span class="badge">ONLINE</span>
        </div>
        <button class="btn-reset" onclick="resetPool()">🔄 RESET ALL TO FREE</button>
        <div class="stats-bar">
            Total Configured Accounts: ${totalAccounts} | <span style="color:#34d399;">Available: ${freeAccounts} Free</span>
        </div>
        <div>${accountCards}</div>
        <script>
            function resetPool() {
                if(confirm("Reset all accounts back to FREE status?")) {
                    fetch('/reset', { method: 'POST' })
                    .then(res => res.json())
                    .then(data => { if(data.success) window.location.reload(); });
                }
            }
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// --- API ENDPOINTS ---
app.post('/request-login', (req, res) => {
    const availableAccount = accounts.find(acc => acc.status === 'FREE');
    if (availableAccount) {
        availableAccount.status = 'IN-USE';
        return res.json({ success: true, phone: availableAccount.phone, password: availableAccount.password });
    }
    return res.json({ success: false, error: "No free accounts available" });
});

app.post('/reset', (req, res) => {
    accounts.forEach(acc => acc.status = 'FREE');
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Pool Manager active on port ${PORT}`);
});
