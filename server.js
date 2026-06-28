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
    { phone: "574623467", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "777263261", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574960432", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574040623", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574623403", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574576605", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574604316", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574219917", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574238215", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "778227919", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574555706", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "573164297", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574138374", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574559302", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574153025", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "779171327", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574084958", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574641548", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574641543", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574940273", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "778301604", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574976516", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574638143", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "779171438", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574987429", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574607021", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574238234", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574219916", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574153094", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574987395", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574203227", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574191028", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574976555", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "770942244", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574076004", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574219728", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "573213942", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574238217", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574048581", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574145023", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574219788", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574153033", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574219794", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574111345", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574084951", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "778228223", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "955216051", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "953583623", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "750054275", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "953659386", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574604324", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574153024", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574555717", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574939954", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574576734", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "573271807", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574015146", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574125189", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "573507265", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574195197", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
    { phone: "574604175", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null },
];

// Separate list for bad password accounts
let badPasswordAccounts = [];

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const FREE_ACCOUNT_LOCK_THRESHOLD = 50;
const LOCK_HOUR = 18;
const LOCK_MINUTE = 0;
const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;
const REMOVE_PASSWORD = '1234';

let poolLocked = false;
let poolLockedReason = '';

function pad(n) { return String(n).padStart(2, '0'); }

setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && acc.logoutTime && (now - acc.logoutTime >= TWENTY_FOUR_HOURS_MS)) {
            acc.status = 'FREE'; acc.logoutTime = null; acc.logoutTimeStr = null;
        }
    });
}, 60 * 1000);

setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const freeCount = accounts.filter(a => a.status === 'FREE').length;
    const isAfterLock = (hour > LOCK_HOUR) || (hour === LOCK_HOUR && minute >= LOCK_MINUTE);
    const isAfterUnlock = (hour > UNLOCK_HOUR) || (hour === UNLOCK_HOUR && minute >= UNLOCK_MINUTE);
    const isLockWindow = isAfterLock || !isAfterUnlock;
    if (poolLocked && isAfterUnlock && !isAfterLock) { poolLocked = false; poolLockedReason = ''; return; }
    if (!poolLocked && isLockWindow) { poolLocked = true; poolLockedReason = 'Daily lock active (18:00 — 07:30). Unlocks at 07:30.'; return; }
    if (!poolLocked && freeCount === FREE_ACCOUNT_LOCK_THRESHOLD) { poolLocked = true; poolLockedReason = `Free accounts reached ${freeCount}. Locked until 07:30.`; }
}, 10 * 1000);

app.get('/stats', (req, res) => {
    res.json({
        free: accounts.filter(a => a.status === 'FREE').length,
        inUse: accounts.filter(a => a.status === 'IN-USE' && !a.logoutTime).length,
        waiting: accounts.filter(a => a.status === 'IN-USE' && a.logoutTime).length,
        badPassword: badPasswordAccounts.length,
        locked: poolLocked,
        reason: poolLockedReason
    });
});

function listPage(title, subtitle, rows, type) {
    const rowsHtml = rows.length
        ? rows.map((r, i) => `
            <div class="row" data-phone="${r.phone}">
                <div class="row-num">${i + 1}.</div>
                <div class="row-info">
                    <div class="row-phone">${r.display || r.phone}</div>
                    ${r.password ? `<div class="row-pass">${r.password}</div>` : ''}
                    ${r.reportedAt ? `<div class="row-time">&#9888; Reported at ${r.reportedAt}</div>` : ''}
                </div>
                <button class="rm-btn" onclick="removeAccount('${r.phone}')">Remove</button>
            </div>`).join('')
        : `<div class="empty">No accounts</div>`;

    return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:sans-serif;background:#04060a;min-height:100vh;padding:20px}
        .page{background:#0d1117;border-radius:16px;width:100%;max-width:520px;margin:0 auto;overflow:hidden}
        .page-header{padding:16px 20px;border-bottom:1px solid #21262d;display:flex;align-items:center;gap:12px}
        .back-btn{background:#161b22;border:1px solid #30363d;color:#8b949e;padding:6px 12px;border-radius:8px;font-size:12px;text-decoration:none;white-space:nowrap}
        .back-btn:hover{background:#21262d;color:#e6edf3}
        .page-title{font-size:15px;font-weight:500;color:#e6edf3}
        .page-subtitle{font-size:11px;color:#4b5563;margin-top:2px}
        .search-wrap{padding:14px 20px;border-bottom:1px solid #21262d}
        .search-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .search-input:focus{border-color:#58a6ff}
        .search-input::placeholder{color:#4b5563}
        .row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #161b22;gap:10px}
        .row:last-child{border-bottom:none}
        .row-num{font-size:12px;color:#4b5563;width:26px;flex-shrink:0}
        .row-info{flex:1;min-width:0}
        .row-phone{font-size:14px;color:#e6edf3;font-weight:500}
        .row-pass{font-size:11px;color:#4b5563;margin-top:2px}
        .row-time{font-size:11px;color:#f87171;margin-top:2px}
        .rm-btn{background:#2d0a0a;border:1px solid #7f1d1d;color:#f87171;padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;flex-shrink:0}
        .rm-btn:hover{background:#3d1010}
        .empty{padding:40px;text-align:center;color:#4b5563;font-size:13px}
        .hidden{display:none}
        .pin-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
        .pin-box{background:#0d1117;border:1.5px solid #21262d;border-radius:16px;padding:28px 24px;width:100%;max-width:320px;text-align:center}
        .pin-title{font-size:15px;font-weight:500;color:#e6edf3;margin-bottom:6px}
        .pin-sub{font-size:12px;color:#4b5563;margin-bottom:20px}
        .pin-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:12px;border-radius:8px;font-size:16px;outline:none;text-align:center;letter-spacing:4px;margin-bottom:14px}
        .pin-input:focus{border-color:#58a6ff}
        .pin-row{display:flex;gap:10px}
        .pin-cancel{flex:1;background:#161b22;border:1px solid #30363d;color:#8b949e;padding:10px;border-radius:8px;font-size:13px;cursor:pointer}
        .pin-confirm{flex:1;background:#7f1d1d;border:none;color:#f87171;padding:10px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer}
        .pin-confirm:hover{background:#991f1f}
        .pin-err{color:#f87171;font-size:12px;margin-top:10px;display:none}
    </style>
</head>
<body>
<div class="page">
    <div class="page-header">
        <a href="/" class="back-btn">&#8592; Back</a>
        <div>
            <div class="page-title">${title}</div>
            <div class="page-subtitle">${subtitle}</div>
        </div>
    </div>
    <div class="search-wrap">
        <input class="search-input" id="search" placeholder="&#128269; Search phone number..." oninput="filterRows(this.value)">
    </div>
    <div id="list">${rowsHtml}</div>
</div>

<div class="pin-overlay" id="pin-modal" style="display:none;">
    <div class="pin-box">
        <div class="pin-title">&#128274; Confirm removal</div>
        <div class="pin-sub">Enter password to remove this account</div>
        <input class="pin-input" id="pin-input" type="password" maxlength="10" placeholder="••••">
        <div class="pin-row">
            <button class="pin-cancel" onclick="closePin()">Cancel</button>
            <button class="pin-confirm" onclick="confirmRemove()">Remove</button>
        </div>
        <div class="pin-err" id="pin-err">Incorrect password</div>
    </div>
</div>

<script>
    let pendingPhone = null;
    const listType = '${type}';

    function removeAccount(phone){
        pendingPhone = phone;
        document.getElementById('pin-input').value='';
        document.getElementById('pin-err').style.display='none';
        document.getElementById('pin-modal').style.display='flex';
        setTimeout(()=>document.getElementById('pin-input').focus(),100);
    }

    function closePin(){
        pendingPhone = null;
        document.getElementById('pin-modal').style.display='none';
    }

    function confirmRemove(){
        const pin = document.getElementById('pin-input').value.trim();
        if(pin !== '1234'){
            document.getElementById('pin-err').style.display='block';
            document.getElementById('pin-input').value='';
            return;
        }
        const endpoint = listType === 'bad' ? '/remove-bad-password' : '/remove-account';
        fetch(endpoint,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({phone: pendingPhone, pin})
        }).then(r=>r.json()).then(d=>{
            if(d.success){
                closePin();
                const row = document.querySelector('[data-phone="'+pendingPhone+'"]');
                if(row) row.remove();
            } else {
                document.getElementById('pin-err').textContent = d.error || 'Error';
                document.getElementById('pin-err').style.display='block';
            }
        });
    }

    document.getElementById('pin-input').addEventListener('keydown', e => {
        if(e.key==='Enter') confirmRemove();
        if(e.key==='Escape') closePin();
    });

    function filterRows(q){
        const rows = document.querySelectorAll('.row');
        const query = q.trim().toLowerCase();
        rows.forEach(row => {
            const phone = row.getAttribute('data-phone') || '';
            row.classList.toggle('hidden', query !== '' && !phone.toLowerCase().includes(query));
        });
    }
</script>
</body>
</html>`;
}

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
        .db{background:#080b10;border-radius:20px;padding:30px;width:100%;max-width:760px}
        .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
        .db-title{font-size:20px;font-weight:500;color:#fff}
        .live-pill{background:#0d4429;color:#3fb950;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:500;display:flex;align-items:center;gap:6px}
        .locked-pill{background:#4b1111;color:#f87171;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:500;display:flex;align-items:center;gap:6px}
        .live-dot{width:7px;height:7px;background:#3fb950;border-radius:50%;animation:blink 1.2s infinite}
        .lock-dot{width:7px;height:7px;background:#f87171;border-radius:50%;animation:blink 0.8s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.15}}
        .four-boxes{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-bottom:20px}
        .box{border-radius:16px;padding:20px 16px 16px;display:flex;flex-direction:column;min-width:0}
        .box-free{background:#0a1a0f;border:1.5px solid #1a4a27}
        .box-inuse{background:#080f1f;border:1.5px solid #1a2f55}
        .box-waiting{background:#120c22;border:1.5px solid #2e1f55}
        .box-bad{background:#1a0f0a;border:1.5px solid #4a1f0a}
        .box-label{font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px}
        .free-col{color:#3fb950}
        .inuse-col{color:#58a6ff}
        .waiting-col{color:#c4b5fd}
        .bad-col{color:#fb923c}
        .box-num{font-size:56px;font-weight:500;line-height:1;letter-spacing:-3px;margin-bottom:8px}
        .num-free{color:#3fb950}
        .num-inuse{color:#58a6ff}
        .num-waiting{color:#c4b5fd}
        .num-bad{color:#fb923c}
        .box-desc{font-size:11px;margin-bottom:16px;flex:1;line-height:1.4}
        .desc-free{color:#2a6e3a}
        .desc-inuse{color:#1e4a7a}
        .desc-waiting{color:#4a3080}
        .desc-bad{color:#7a3a10}
        .unlock-timer{font-size:15px;font-weight:500;color:#fff;margin-bottom:3px}
        .unlock-sub{font-size:10px;color:#4b1111;margin-bottom:12px}
        .view-btn{width:100%;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border:none;background:#92400e;color:#fed7aa;text-decoration:none}
        .view-btn:hover{background:#a05213}
        .view-count{background:#fed7aa;color:#92400e;border-radius:20px;padding:1px 8px;font-size:11px;font-weight:700}
        .divider{height:1px;background:#1a1f2a;margin-bottom:20px}
        .add-box{background:#0d1117;border:1.5px solid #21262d;border-radius:14px;padding:20px 24px;margin-bottom:20px}
        .add-title{font-size:13px;font-weight:500;color:#8b949e;margin-bottom:14px;letter-spacing:0.5px;text-transform:uppercase}
        .add-row{display:flex;gap:10px;flex-wrap:wrap}
        .add-input{flex:1;min-width:120px;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .add-input:focus{border-color:#58a6ff}
        .add-input::placeholder{color:#4b5563}
        .add-btn{background:#1a3a6e;border:none;color:#a8d0ff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap}
        .add-btn:hover{background:#1f4480}
        .reset-btn{width:100%;background:#130a0a;border:1.5px solid #3d1515;color:#f85149;padding:13px;border-radius:12px;font-size:13px;font-weight:500;cursor:pointer}
        .reset-btn:hover{background:#1f0e0e}
        .footer{display:flex;justify-content:space-between;align-items:center;margin-top:16px}
        .tick{font-size:11px;color:#3fb950;font-family:monospace;opacity:0.7}
        .hint{font-size:10px;color:#252b35}
        .msg{font-size:12px;margin-top:10px;padding:8px 12px;border-radius:6px;display:none}
        .msg-ok{background:#0d4429;color:#3fb950}
        .msg-err{background:#4b1111;color:#f87171}
        @media(max-width:600px){.four-boxes{grid-template-columns:1fr 1fr}.box-num{font-size:44px}}
        @media(max-width:400px){.four-boxes{grid-template-columns:1fr}}
    </style>
</head>
<body>
<div class="db">
    <div class="top-bar">
        <div class="db-title">&#128274; Login pool manager</div>
        <div id="pill" class="${poolLocked ? 'locked-pill' : 'live-pill'}">
            <div class="${poolLocked ? 'lock-dot' : 'live-dot'}"></div>
            ${poolLocked ? 'Locked' : 'Live'}
        </div>
    </div>

    <div class="four-boxes">
        <div class="box box-free" id="free-box">
            <div class="box-label free-col" id="free-label">&#10003; Free</div>
            <div class="box-num num-free" id="num-free">${freeAccounts.length}</div>
            <div class="box-desc desc-free" id="free-desc">Accounts ready</div>
            <div id="unlock-block" style="display:none;">
                <div class="unlock-timer" id="unlock-countdown">--:--:--</div>
                <div class="unlock-sub">Unlocks at 07:30</div>
            </div>
            <a href="/view/free" class="view-btn">View <span class="view-count" id="cnt-free">${freeAccounts.length}</span></a>
        </div>

        <div class="box box-inuse">
            <div class="box-label inuse-col">&#9654; In use</div>
            <div class="box-num num-inuse" id="num-inuse">${inUseAccounts.length}</div>
            <div class="box-desc desc-inuse">Not yet logged out</div>
            <a href="/view/inuse" class="view-btn">View <span class="view-count" id="cnt-inuse">${inUseAccounts.length}</span></a>
        </div>

        <div class="box box-waiting">
            <div class="box-label waiting-col">&#9203; Waiting 24h</div>
            <div class="box-num num-waiting" id="num-waiting">${waitingAccounts.length}</div>
            <div class="box-desc desc-waiting">Full account</div>
            <a href="/view/waiting" class="view-btn">View <span class="view-count" id="cnt-waiting">${waitingAccounts.length}</span></a>
        </div>

        <div class="box box-bad">
            <div class="box-label bad-col">&#10060; Bad password</div>
            <div class="box-num num-bad" id="num-bad">${badPasswordAccounts.length}</div>
            <div class="box-desc desc-bad">Login failed</div>
            <a href="/view/bad" class="view-btn">View <span class="view-count" id="cnt-bad">${badPasswordAccounts.length}</span></a>
        </div>
    </div>

    <div class="add-box">
        <div class="add-title">&#43; Add account</div>
        <div class="add-row">
            <input class="add-input" id="inp-phone" placeholder="Phone number" type="text">
            <input class="add-input" id="inp-pass" placeholder="Password" type="text">
            <button class="add-btn" onclick="addAccount()">Add</button>
        </div>
        <div class="msg" id="add-msg"></div>
    </div>

    <div class="divider"></div>
    <button class="reset-btn" onclick="if(confirm('Reset all accounts to FREE and remove lock?')) fetch('/reset',{method:'POST'}).then(()=>location.reload())">
        &#8635; Reset all to free
    </button>
    <div class="footer">
        <span class="tick" id="tick">--:--:--</span>
        <span class="hint">Live data</span>
    </div>
</div>

<script>
    function pad(n){return String(n).padStart(2,'0')}

    function update(){
        const now=new Date();
        document.getElementById('tick').textContent=pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
        const cd=document.getElementById('unlock-countdown');
        if(cd && document.getElementById('unlock-block').style.display!=='none'){
            const unlock=new Date(); unlock.setHours(7,30,0,0);
            if(unlock<=now) unlock.setDate(unlock.getDate()+1);
            const diff=unlock-now;
            cd.textContent=Math.floor(diff/3600000)+'h '+pad(Math.floor((diff%3600000)/60000))+'m '+pad(Math.floor((diff%60000)/1000))+'s';
        }
    }

    function refreshStats(){
        fetch('/stats').then(r=>r.json()).then(d=>{
            document.getElementById('num-free').textContent=d.free;
            document.getElementById('num-inuse').textContent=d.inUse;
            document.getElementById('num-waiting').textContent=d.waiting;
            document.getElementById('num-bad').textContent=d.badPassword;
            document.getElementById('cnt-free').textContent=d.free;
            document.getElementById('cnt-inuse').textContent=d.inUse;
            document.getElementById('cnt-waiting').textContent=d.waiting;
            document.getElementById('cnt-bad').textContent=d.badPassword;

            const pill=document.getElementById('pill');
            pill.className=d.locked?'locked-pill':'live-pill';
            pill.innerHTML=d.locked?'<div class="lock-dot"></div> Locked':'<div class="live-dot"></div> Live';

            const freeBox=document.getElementById('free-box');
            const freeLabel=document.getElementById('free-label');
            const freeNum=document.getElementById('num-free');
            const freeDesc=document.getElementById('free-desc');
            const unlockBlock=document.getElementById('unlock-block');

            if(d.locked){
                freeBox.style.cssText='background:#1a0a0a;border:1.5px solid #7f1d1d;border-radius:16px;padding:20px 16px 16px;display:flex;flex-direction:column;min-width:0;';
                freeLabel.style.color='#f87171'; freeLabel.innerHTML='&#128274; Free — Locked';
                freeNum.style.color='#f87171';
                freeDesc.style.color='#7f2020'; freeDesc.textContent=d.reason;
                unlockBlock.style.display='block';
            } else {
                freeBox.style.cssText='background:#0a1a0f;border:1.5px solid #1a4a27;border-radius:16px;padding:20px 16px 16px;display:flex;flex-direction:column;min-width:0;';
                freeLabel.style.color='#3fb950'; freeLabel.innerHTML='&#10003; Free';
                freeNum.style.color='#3fb950';
                freeDesc.style.color='#2a6e3a'; freeDesc.textContent='Accounts ready';
                unlockBlock.style.display='none';
            }
        }).catch(()=>{});
    }

    function showMsg(text,ok){
        const el=document.getElementById('add-msg');
        el.textContent=text; el.className='msg '+(ok?'msg-ok':'msg-err');
        el.style.display='block';
        setTimeout(()=>el.style.display='none',3000);
    }

    function addAccount(){
        const phone=document.getElementById('inp-phone').value.trim();
        const password=document.getElementById('inp-pass').value.trim();
        if(!phone||!password){showMsg('Phone and password required',false);return;}
        fetch('/add-account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,password})})
        .then(r=>r.json()).then(d=>{
            if(d.success){
                showMsg('Account '+phone+' added!',true);
                document.getElementById('inp-phone').value='';
                document.getElementById('inp-pass').value='';
                refreshStats();
            } else { showMsg(d.error,false); }
        });
    }

    setInterval(update,1);
    setInterval(refreshStats,1000);
    update(); refreshStats();
</script>
</body>
</html>`);
});

app.get('/view/free', (req, res) => {
    const list = accounts.filter(a => a.status === 'FREE');
    res.send(listPage('Free Accounts', list.length + ' accounts ready', list, 'free'));
});

app.get('/view/inuse', (req, res) => {
    const list = accounts.filter(a => a.status === 'IN-USE' && !a.logoutTime);
    res.send(listPage('In Use', list.length + ' not yet logged out', list, 'inuse'));
});

app.get('/view/waiting', (req, res) => {
    const list = accounts.filter(a => a.status === 'IN-USE' && a.logoutTime)
        .map(a => ({ phone: a.phone, display: a.phone + '  —  out at ' + (a.logoutTimeStr || 'N/A'), password: '' }));
    res.send(listPage('Waiting 24h', list.length + ' full accounts', list, 'waiting'));
});

app.get('/view/bad', (req, res) => {
    res.send(listPage('Bad Password', badPasswordAccounts.length + ' accounts with wrong password', badPasswordAccounts, 'bad'));
});

app.post('/wrong-password', (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.json({ success: false, error: 'Phone required.' });
    const now = new Date();
    const timeStr = pad(now.getHours()) + ':' + pad(now.getMinutes());
    // Remove from main accounts
    const index = accounts.findIndex(a => a.phone === phone);
    const acc = index !== -1 ? accounts.splice(index, 1)[0] : { phone, password: 'unknown' };
    // Add to bad password list if not already there
    if (!badPasswordAccounts.find(a => a.phone === phone)) {
        badPasswordAccounts.push({ phone: acc.phone, password: acc.password, reportedAt: timeStr, status: 'BAD_PASSWORD' });
        console.log(`Bad password account: ${phone} at ${timeStr}`);
    }
    res.json({ success: true });
});

app.post('/add-account', (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) return res.json({ success: false, error: 'Phone and password required.' });
    if (accounts.find(a => a.phone === phone)) return res.json({ success: false, error: 'Account already exists.' });
    accounts.push({ phone, password, status: 'FREE', logoutTime: null, logoutTimeStr: null });
    res.json({ success: true });
});

app.post('/remove-account', (req, res) => {
    const { phone, pin } = req.body;
    if (pin !== REMOVE_PASSWORD) return res.json({ success: false, error: 'Incorrect password.' });
    const index = accounts.findIndex(a => a.phone === phone);
    if (index === -1) return res.json({ success: false, error: 'Account not found.' });
    accounts.splice(index, 1);
    res.json({ success: true });
});

app.post('/remove-bad-password', (req, res) => {
    const { phone, pin } = req.body;
    if (pin !== REMOVE_PASSWORD) return res.json({ success: false, error: 'Incorrect password.' });
    const index = badPasswordAccounts.findIndex(a => a.phone === phone);
    if (index === -1) return res.json({ success: false, error: 'Account not found.' });
    badPasswordAccounts.splice(index, 1);
    res.json({ success: true });
});

app.post('/request-login', (req, res) => {
    if (poolLocked) return res.json({ success: false, error: `Pool locked until 07:30. ${poolLockedReason}` });
    const availableAccount = accounts.find(acc => acc.status === 'FREE');
    if (availableAccount) {
        availableAccount.status = 'IN-USE'; availableAccount.logoutTime = null; availableAccount.logoutTimeStr = null;
        return res.json({ success: true, phone: availableAccount.phone, password: availableAccount.password });
    }
    return res.json({ success: false, error: "No free accounts available" });
});

app.post('/login', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account && account.status === 'FREE') {
        account.status = 'IN-USE'; account.logoutTime = null; account.logoutTimeStr = null;
        return res.json({ success: true, message: `Account ${phone} marked as logged in.` });
    }
    return res.json({ success: false, error: "Account not available or already in use." });
});

app.post('/logout', (req, res) => {
    const { phone, logoutTime } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account) {
        account.logoutTime = Date.now(); account.logoutTimeStr = logoutTime;
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
    poolLocked = false; poolLockedReason = '';
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Pool Manager active on port ${PORT}`));
