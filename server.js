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

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const FREE_ACCOUNT_LOCK_THRESHOLD = 50;
const LOCK_HOUR = 18;
const LOCK_MINUTE = 0;
const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;

let poolLocked = false;
let poolLockedReason = '';

function pad(n) { return String(n).padStart(2, '0'); }

setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && acc.logoutTime && (now - acc.logoutTime >= TWENTY_FOUR_HOURS_MS)) {
            acc.status = 'FREE';
            acc.logoutTime = null;
            acc.logoutTimeStr = null;
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

function listPage(title, subtitle, rows, showDelete = false) {
    const rowsHtml = rows.length
        ? rows.map((r, i) => `
            <div style="display:flex;align-items:center;padding:14px 24px;border-bottom:1px solid #161b22;gap:12px;">
                <div style="font-size:13px;color:#4b5563;width:28px;flex-shrink:0;">${i + 1}.</div>
                <div style="font-size:15px;color:#e6edf3;font-weight:500;flex:1;">${r.phone}</div>
                <div style="font-size:12px;color:#4b5563;">${r.password}</div>
                ${showDelete ? `<button onclick="removeAccount('${r.phone}')" style="background:#2d0a0a;border:1px solid #7f1d1d;color:#f87171;padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;">Remove</button>` : ''}
            </div>`).join('')
        : `<div style="padding:40px 24px;text-align:center;color:#4b5563;font-size:13px;">No accounts</div>`;

    return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:sans-serif;background:#04060a;min-height:100vh;padding:20px}
        .page{background:#0d1117;border-radius:16px;width:100%;max-width:520px;margin:0 auto;overflow:hidden}
        .page-header{padding:20px 24px 16px;border-bottom:1px solid #21262d;display:flex;align-items:center;gap:14px}
        .back-btn{background:#161b22;border:1px solid #30363d;color:#8b949e;padding:6px 12px;border-radius:8px;font-size:12px;cursor:pointer;text-decoration:none;display:inline-block;white-space:nowrap}
        .back-btn:hover{background:#21262d;color:#e6edf3}
        .page-title{font-size:16px;font-weight:500;color:#e6edf3}
        .page-subtitle{font-size:11px;color:#4b5563;margin-top:3px}
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
    ${rowsHtml}
</div>
<script>
    function removeAccount(phone){
        if(!confirm('Remove account ' + phone + '?')) return;
        fetch('/remove-account', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({phone})
        }).then(r => r.json()).then(d => {
            if(d.success) location.reload();
            else alert('Error: ' + d.error);
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
        .db{background:#080b10;border-radius:20px;padding:30px;width:100%;max-width:720px}
        .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
        .db-title{font-size:20px;font-weight:500;color:#fff}
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
        .box-label{font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px}
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
        .unlock-timer{font-size:17px;font-weight:500;color:#fff;margin-bottom:3px}
        .unlock-sub{font-size:10px;color:#4b1111;margin-bottom:12px}
        .view-btn{width:100%;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;border:none;background:#92400e;color:#fed7aa;text-decoration:none}
        .view-btn:hover{background:#a05213}
        .view-count{background:#fed7aa;color:#92400e;border-radius:20px;padding:1px 9px;font-size:12px;font-weight:700}
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
                ${poolLocked ? '&#128274; Free — Locked' : '&#10003; Free'}
            </div>
            <div class="box-num ${poolLocked ? 'num-free-locked' : 'num-free'}">${freeAccounts.length}</div>
            ${poolLocked ? `
                <div class="box-desc desc-free-locked">${poolLockedReason}</div>
                <div class="unlock-timer" id="unlock-countdown">--:--:--</div>
                <div class="unlock-sub">Unlocks at 07:30</div>
            ` : `<div class="box-desc desc-free">Accounts ready</div>`}
            <a href="/view/free" class="view-btn">View <span class="view-count">${freeAccounts.length}</span></a>
        </div>
        <div class="box box-inuse">
            <div class="box-label inuse-col">&#9654; In use</div>
            <div class="box-num num-inuse">${inUseAccounts.length}</div>
            <div class="box-desc desc-inuse">Not yet logged out</div>
            <a href="/view/inuse" class="view-btn">View <span class="view-count">${inUseAccounts.length}</span></a>
        </div>
        <div class="box box-waiting">
            <div class="box-label waiting-col">&#9203; Waiting 24h</div>
            <div class="box-num num-waiting">${waitingAccounts.length}</div>
            <div class="box-desc desc-waiting">Full account</div>
            <a href="/view/waiting" class="view-btn">View <span class="view-count">${waitingAccounts.length}</span></a>
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
        <span class="hint">Auto-refresh: 1ms</span>
    </div>
</div>

<script>
    function pad(n){return String(n).padStart(2,'0')}
    function update(){
        const now=new Date();
        document.getElementById('tick').textContent=pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds());
        const cd=document.getElementById('unlock-countdown');
        if(cd){
            const unlock=new Date(); unlock.setHours(7,30,0,0);
            if(unlock<=now) unlock.setDate(unlock.getDate()+1);
            const diff=unlock-now;
            cd.textContent=Math.floor(diff/3600000)+'h '+pad(Math.floor((diff%3600000)/60000))+'m '+pad(Math.floor((diff%60000)/1000))+'s';
        }
    }
    function showMsg(text, ok){
        const el=document.getElementById('add-msg');
        el.textContent=text;
        el.className='msg '+(ok?'msg-ok':'msg-err');
        el.style.display='block';
        setTimeout(()=>el.style.display='none', 3000);
    }
    function addAccount(){
        const phone=document.getElementById('inp-phone').value.trim();
        const password=document.getElementById('inp-pass').value.trim();
        if(!phone||!password){ showMsg('Phone and password required', false); return; }
        fetch('/add-account',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({phone,password})
        }).then(r=>r.json()).then(d=>{
            if(d.success){
                showMsg('Account '+phone+' added!', true);
                document.getElementById('inp-phone').value='';
                document.getElementById('inp-pass').value='';
                setTimeout(()=>location.reload(), 1000);
            } else {
                showMsg(d.error, false);
            }
        });
    }
    setInterval(update,1); update();
    setInterval(()=>location.reload(),5000);
</script>
</body>
</html>`);
});

app.get('/view/free', (req, res) => {
    const list = accounts.filter(a => a.status === 'FREE');
    res.send(listPage('Free Accounts', list.length + ' accounts ready', list, true));
});

app.get('/view/inuse', (req, res) => {
    const list = accounts.filter(a => a.status === 'IN-USE' && !a.logoutTime);
    res.send(listPage('In Use', list.length + ' not yet logged out', list, true));
});

app.get('/view/waiting', (req, res) => {
    const list = accounts.filter(a => a.status === 'IN-USE' && a.logoutTime);
    res.send(listPage('Waiting 24h', list.length + ' full accounts', list, true));
});

app.post('/add-account', (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) return res.json({ success: false, error: 'Phone and password required.' });
    if (accounts.find(a => a.phone === phone)) return res.json({ success: false, error: 'Account already exists.' });
    accounts.push({ phone, password, status: 'FREE', logoutTime: null, logoutTimeStr: null });
    console.log(`Account added: ${phone}`);
    res.json({ success: true });
});

app.post('/remove-account', (req, res) => {
    const { phone } = req.body;
    const index = accounts.findIndex(a => a.phone === phone);
    if (index === -1) return res.json({ success: false, error: 'Account not found.' });
    accounts.splice(index, 1);
    console.log(`Account removed: ${phone}`);
    res.json({ success: true });
});

app.post('/request-login', (req, res) => {
    if (poolLocked) return res.json({ success: false, error: `Pool locked until 07:30. ${poolLockedReason}` });
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
