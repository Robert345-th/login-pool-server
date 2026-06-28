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

let accounts = [
    { phone: "0763207608", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "0760017804", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
];

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const FREE_ACCOUNT_LOCK_THRESHOLD = 50;
const LOCK_HOUR = 18;
const LOCK_MINUTE = 0;
const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;

let poolLocked = false;
let poolLockedReason = '';

// --- AUTO-FREE after 24h ---
setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && acc.logoutTime && (now - acc.logoutTime >= TWENTY_FOUR_HOURS_MS)) {
            console.log(`Auto-freeing account ${acc.phone} after 24 hours.`);
            acc.status = 'FREE';
            acc.logoutTime = null;
            acc.logoutTimeStr = null;
        }
    });
}, 60 * 1000);

// --- LOCK / UNLOCK CHECK: runs every 10 seconds ---
setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const freeCount = accounts.filter(a => a.status === 'FREE').length;

    const isAfterLock = (hour > LOCK_HOUR) || (hour === LOCK_HOUR && minute >= LOCK_MINUTE);
    const isAfterUnlock = (hour > UNLOCK_HOUR) || (hour === UNLOCK_HOUR && minute >= UNLOCK_MINUTE);
    const isLockWindow = isAfterLock || !isAfterUnlock;

    // Auto-unlock at 07:30
    if (poolLocked && isAfterUnlock && !isAfterLock) {
        poolLocked = false;
        poolLockedReason = '';
        console.log('Pool unlocked at 07:30.');
        return;
    }

    // Lock at 18:00 regardless of account count
    if (!poolLocked && isLockWindow) {
        poolLocked = true;
        poolLockedReason = 'Daily lock active (18:00 — 07:30). Unlocks at 07:30.';
        console.log(poolLockedReason);
        return;
    }

    // Lock if free accounts hit exactly 50
    if (!poolLocked && freeCount === FREE_ACCOUNT_LOCK_THRESHOLD) {
        poolLocked = true;
        poolLockedReason = `Free accounts reached ${freeCount}. Locked until 07:30.`;
        console.log(poolLockedReason);
    }

}, 10 * 1000);

function pad(n) { return String(n).padStart(2, '0'); }

app.get('/', (req, res) => {
    const freeAccounts = accounts.filter(a => a.status === 'FREE');
    const inUseAccounts = accounts.filter(a => a.status === 'IN-USE' && !a.logoutTime);
    const waitingAccounts = accounts.filter(a => a.status === 'IN-USE' && a.logoutTime);

    res.send(`<!DOCTYPE html>
<html>
<head>
    <title>Login Pool Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:sans-serif;background:#04060a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
        .db{background:#080b10;border-radius:20px;padding:30px;width:100%;max-width:720px}
        .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
        .db-title{font-size:20px;font-weight:500;color:#fff;display:flex;align-items:center;gap:10px}
        .live-pill{background:#0d4429;color:#3fb950;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:500;display:flex;align-items:center;gap:6px}
        .locked-pill{background:#4b1111;color:#f87171;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:500;display:flex;align-items:center;gap:6px}
        .live-dot{width:7px;height:7px;background:#3fb950;border-radius:50%;animation:blink 1.2s infinite}
        .lock-dot{width:7px;height:7px;background:#f87171;border-radius:50%;animation:blink 0.8s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.15}}
        .three-boxes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:20px}
        .box{border-radius:16px;padding:22px 18px 18px;display:flex;flex-direction:column;min-width:0}
        .box-free{background:#0a1a0f;border:1.5px solid #1a4a27}
        .box-free-locked{background:#1a0a0a;border:1.5px solid #7f1d1d}
        .box-inuse{background:#080f1f;border:1.5px solid #1a2f55}
        .box-waiting{background:#120c22;border:1.5px solid #2e1f55}
        .box-label{font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;gap:5px;margin-bottom:14px}
        .free-col{color:#3fb950}
        .free-locked-col{color:#f87171}
        .inuse-col{color:#58a6ff}
        .waiting-col{color:#c4b5fd}
        .box-num{font-size:64px;font-weight:500;line-height:1;letter-spacing:-3px;margin-bottom:8px}
        .num-free{color:#3fb950}
        .num-free-locked{color:#f87171}
        .num-inuse{color:#58a6ff}
        .num-waiting{color:#c4b5fd}
        .box-desc{font-size:11px;margin-bottom:16px;flex:1;line-height:1.4}
        .desc-free{color:#2a6e3a}
        .desc-free-locked{color:#7f2020}
        .desc-inuse{color:#1e4a7a}
        .desc-waiting{color:#4a3080}
        .unlock-timer{font-size:17px;font-weight:500;color:#fff;letter-spacing:-0.5px;margin-bottom:3px}
        .unlock-sub{font-size:10px;color:#4b1111;margin-bottom:12px}
        .view-btn{width:100%;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:11px;border:none;background:#92400e;color:#fed7aa;margin-bottom:8px}
        .view-btn:hover{background:#a05213}
        .acc-count{text-align:center;font-size:20px;font-weight:500;color:#f97316}
        .acc-count-locked{text-align:center;font-size:20px;font-weight:500;color:#f87171}
        .divider{height:1px;background:#1a1f2a;margin-bottom:20px}
        .reset-btn{width:100%;background:#130a0a;border:1.5px solid #3d1515;color:#f85149;padding:13px;border-radius:12px;font-size:13px;font-weight:500;cursor:pointer}
        .reset-btn:hover{background:#1f0e0e}
        .footer{display:flex;justify-content:space-between;align-items:center;margin-top:16px}
        .tick{font-size:11px;color:#3fb950;font-family:monospace;opacity:0.7}
        .hint{font-size:10px;color:#252b35}
        @media(max-width:500px){.three-boxes{grid-template-columns:1fr}.box-num{font-size:48px}}
    </style>
</head>
<body>
<div class="db">
    <div class="top-bar">
        <div class="db-title">&#128274; Login pool manager</div>
        ${poolLocked
            ? `<div class="locked-pill"><div class="lock-dot"></div> Locked</div>`
            : `<div class="live-pill"><div class="live-dot"></div> Live</div>`
        }
    </div>

    <div class="three-boxes">

        <div class="box ${poolLocked ? 'box-free-locked' : 'box-free'}">
            <div class="box-label ${poolLocked ? 'free-locked-col' : 'free-col'}">
                ${poolLocked ? '&#128274; Free &mdash; Locked' : '&#10003; Free'}
            </div>
            <div class="box-num ${poolLocked ? 'num-free-locked' : 'num-free'}">${freeAccounts.length}</div>
            ${poolLocked ? `
                <div class="box-desc desc-free-locked">${poolLockedReason}</div>
                <div class="unlock-timer" id="unlock-countdown">--:--:--</div>
                <div class="unlock-sub">Unlocks at 07:30</div>
            ` : `
                <div class="box-desc desc-free">Accounts ready</div>
            `}
            <button class="view-btn" onclick="alert('Free accounts:\\n\\n${freeAccounts.map(a => a.phone).join('\\n') || 'None'}')">View</button>
            <div class="${poolLocked ? 'acc-count-locked' : 'acc-count'}">${freeAccounts.length}</div>
        </div>

        <div class="box box-inuse">
            <div class="box-label inuse-col">&#9654; In use</div>
            <div class="box-num num-inuse">${inUseAccounts.length}</div>
            <div class="box-desc desc-inuse">Not yet logged out</div>
            <button class="view-btn" onclick="alert('In use:\\n\\n${inUseAccounts.map(a => a.phone).join('\\n') || 'None'}')">View</button>
            <div class="acc-count">${inUseAccounts.length}</div>
        </div>

        <div class="box box-waiting">
            <div class="box-label waiting-col">&#9203; Waiting 24h</div>
            <div class="box-num num-waiting">${waitingAccounts.length}</div>
            <div class="box-desc desc-waiting">Full account</div>
            <button class="view-btn" onclick="alert('Waiting 24h:\\n\\n${waitingAccounts.map(a => a.phone + ' — out at ' + (a.logoutTimeStr || 'N/A')).join('\\n') || 'None'}')">View</button>
            <div class="acc-count">${waitingAccounts.length}</div>
        </div>

    </div>

    <div class="divider"></div>

    <button class="reset-btn" onclick="if(confirm('Reset all accounts to FREE and remove lock?')) fetch('/reset',{method:'POST'}).then(()=>location.reload())">
        &#8635; Reset all to free
    </button>

    <div class="footer">
        <span class="tick" id="tick">--:--:--</span>
        <span class="hint">Auto-refresh: 1ms</span>
    </div>
</div>
<script>
    function pad(n){return String(n).padStart(2,'0')}
    function update(){
        const now = new Date();
        document.getElementById('tick').textContent = pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
        const cd = document.getElementById('unlock-countdown');
        if(cd){
            const unlock = new Date();
            unlock.setHours(7,30,0,0);
            if(unlock<=now) unlock.setDate(unlock.getDate()+1);
            const diff=unlock-now;
            const h=Math.floor(diff/3600000);
            const m=Math.floor((diff%3600000)/60000);
            const s=Math.floor((diff%60000)/1000);
            cd.textContent=h+'h '+pad(m)+'m '+pad(s)+'s';
        }
    }
    setInterval(update,1);
    update();
    setInterval(()=>location.reload(),5000);
</script>
</body>
</html>`);
});

app.post('/request-login', (req, res) => {
    if (poolLocked) {
        return res.json({ success: false, error: `Pool locked until 07:30. ${poolLockedReason}` });
    }
    const availableAccount = accounts.find(acc => acc.status === 'FREE');
    if (availableAccount) {
        availableAccount.status = 'IN-USE';
        availableAccount.logoutTime = null;
        availableAccount.logoutTimeStr = null;
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
        account.logoutTimeStr = null;
        return res.json({ success: true, message: `Account ${phone} marked as logged in.` });
    }
    return res.json({ success: false, error: "Account not available or already in use." });
});

app.post('/logout', (req, res) => {
    const { phone, logoutTime } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account) {
        account.logoutTime = Date.now();
        account.logoutTimeStr = logoutTime;
        console.log(`Account ${phone} logged out at ${logoutTime}`);
        return res.json({ success: true, message: `Account ${phone} logged out at ${logoutTime}. Will free after 24h.` });
    }
    return res.json({ success: false, error: "Account not found." });
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
    accounts.forEach(acc => { acc.status = 'FREE'; acc.logoutTime = null; acc.logoutTimeStr = null; });
    poolLocked = false;
    poolLockedReason = '';
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Pool Manager active on port ${PORT}`));
