const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// --- ACCOUNT POOL ---
let accounts = [
    { phone: "0763207608", password: "R0978012009", status: "FREE", logoutTime: null },
    { phone: "0760017804", password: "R0978012009", status: "FREE", logoutTime: null },
];

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

// --- AUTO-FREE CHECK: runs every minute ---
setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && acc.logoutTime && (now - acc.logoutTime >= TWENTY_FOUR_HOURS_MS)) {
            console.log(`Auto-freeing account ${acc.phone} after 24 hours.`);
            acc.status = 'FREE';
            acc.logoutTime = null;
        }
    });
}, 60 * 1000);

// --- DASHBOARD ---
app.get('/', (req, res) => {
    const now = Date.now();
    const freeAccounts = accounts.filter(acc => acc.status === 'FREE');
    const usedAccounts = accounts.filter(acc => acc.status !== 'FREE');

    function timeUntilFree(acc) {
        if (!acc.logoutTime) return 'N/A';
        const remaining = TWENTY_FOUR_HOURS_MS - (now - acc.logoutTime);
        if (remaining <= 0) return 'Soon';
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        return `${h}h ${m}m`;
    }

    function accountCard(acc, showTimer = false) {
        const statusColor = acc.status === 'FREE' ? '#065f46' : acc.status === 'IN-USE' ? '#1e3a8a' : '#7e22ce';
        const statusText = acc.status === 'FREE' ? '#34d399' : acc.status === 'IN-USE' ? '#93c5fd' : '#e9d5ff';
        return `
        <div style="background:#1e293b; padding:15px; margin:10px 0; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid #334155;">
            <div>
                <div style="color:#f8fafc; font-weight:bold; font-size:1.05em;">📱 ${acc.phone}</div>
                <div style="color:#94a3b8; font-size:0.85em; margin-top:4px;">🔑 ${acc.password}</div>
                ${showTimer ? `<div style="color:#fbbf24; font-size:0.8em; margin-top:4px;">⏳ Free in: ${timeUntilFree(acc)}</div>` : ''}
            </div>
            <span style="background:${statusColor}; color:${statusText}; padding:6px 12px; border-radius:6px; font-weight:bold; font-size:0.8em; text-transform:uppercase;">
                ${acc.status}
            </span>
        </div>`;
    }

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login Pool Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="refresh" content="60">
        <style>
            * { box-sizing: border-box; }
            body { font-family: sans-serif; background:#0f172a; color:#e2e8f0; max-width:700px; margin:0 auto; padding:20px; }
            h1 { color:#f1f5f9; text-align:center; margin-bottom:5px; }
            .badge { display:block; text-align:center; margin-bottom:20px; }
            .badge span { background:#10b981; color:white; padding:5px 14px; border-radius:20px; font-size:0.8em; font-weight:bold; }
            .btn-reset { width:100%; background:#ef4444; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; font-size:1em; cursor:pointer; margin-bottom:25px; }
            .grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
            .box { background:#0f172a; border:1px solid #334155; border-radius:12px; padding:15px; }
            .box-title { font-weight:bold; font-size:1em; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid #334155; }
            .free-title { color:#34d399; }
            .used-title { color:#93c5fd; }
            .empty { color:#475569; font-size:0.9em; text-align:center; padding:20px 0; }
            @media(max-width:500px) { .grid { grid-template-columns:1fr; } }
        </style>
    </head>
    <body>
        <h1>🔑 Login Pool Manager</h1>
        <div class="badge"><span>ONLINE</span></div>
        <button class="btn-reset" onclick="resetPool()">🔄 RESET ALL TO FREE</button>

        <div class="grid">
            <div class="box">
                <div class="box-title free-title">✅ Free Accounts (${freeAccounts.length})</div>
                ${freeAccounts.length > 0 ? freeAccounts.map(acc => accountCard(acc, false)).join('') : '<div class="empty">No free accounts</div>'}
            </div>
            <div class="box">
                <div class="box-title used-title">🔒 In-Use Accounts (${usedAccounts.length})</div>
                ${usedAccounts.length > 0 ? usedAccounts.map(acc => accountCard(acc, true)).join('') : '<div class="empty">No accounts in use</div>'}
            </div>
        </div>

        <script>
            function resetPool() {
                if(confirm("Reset all accounts back to FREE status?")) {
                    fetch('/reset', { method:'POST' })
                    .then(res => res.json())
                    .then(data => { if(data.success) window.location.reload(); });
                }
            }
        </script>
    </body>
    </html>
    `);
});

// --- API ENDPOINTS ---
app.post('/request-login', (req, res) => {
    const availableAccount = accounts.find(acc => acc.status === 'FREE');
    if (availableAccount) {
        availableAccount.status = 'IN-USE';
        availableAccount.logoutTime = null;
        return res.json({ success: true, phone: availableAccount.phone, password: availableAccount.password });
    }
    return res.json({ success: false, error: "No free accounts available" });
});

app.post('/login', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account && account.status === 'FREE') {
        account.status = 'IN-USE';
        account.logoutTime = null;
        return res.json({ success: true, message: `Account ${phone} marked as logged in.` });
    }
    return res.json({ success: false, error: "Account not available or already in use." });
});

app.post('/logout', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account && account.status === 'IN-USE') {
        account.logoutTime = Date.now(); // start 24h countdown
        return res.json({ success: true, message: `Account ${phone} logout time recorded. Will free after 24h.` });
    }
    return res.json({ success: false, error: "Account not found or not in use." });
});

app.post('/aviator-lock', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account) {
        account.status = 'LOCKED';
        return res.json({ success: true, message: `Account ${phone} locked in Aviator.` });
    }
    return res.json({ success: false, error: "Account not found." });
});

app.post('/reset', (req, res) => {
    accounts.forEach(acc => { acc.status = 'FREE'; acc.logoutTime = null; });
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Pool Manager active on port ${PORT}`));
