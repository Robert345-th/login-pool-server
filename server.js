const express = require('express');
const app = express();
const cors = require('cors'); // Ensure you run 'npm install cors'
app.use(express.json());
app.use(cors());

// The 78 account pool
let accounts = [
    { phone: "0763207608", password: "R0978012009", status: "FREE" },
    { phone: "0760017804", password: "R0978012009", status: "FREE" },
    // ... add all your 78 numbers here exactly as you listed them ...
    { phone: "074203235", password: "R0978012009", status: "FREE" }
];

app.post('/request-instruction', (req, res) => {
    const { phone } = req.body;
    let acc = accounts.find(a => a.phone === phone);
    
    // If browser doesn't have an account yet, give it one
    if (!acc) {
        acc = accounts.find(a => a.status === 'FREE');
        if (acc) {
            acc.status = 'IN-USE';
            return res.json({ action: "LOGIN", phone: acc.phone, pass: acc.password });
        }
        return res.json({ action: "WAIT" });
    }
    
    // If the browser reports IN-GAME, tell it to stop all automation
    res.json({ action: acc.status === 'IN-GAME' ? "STAY_IDLE" : "CONTINUE" });
});

app.post('/update-status', (req, res) => {
    const { phone, status } = req.body;
    let acc = accounts.find(a => a.phone === phone);
    if (acc) acc.status = status;
    res.send({ success: true });
});

app.listen(process.env.PORT || 3000, () => console.log("Server Active"));
