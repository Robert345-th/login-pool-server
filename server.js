const express = require('express');
const app = express();
app.use(express.json());

// List of accounts - Keep this simple
const accounts = [
    { phone: "0763207608", password: "R0978012009", status: "FREE" },
    { phone: "0760017804", password: "R0978012009", status: "FREE" },
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
    { phone: "074203235", password: "R0978012009", status: "FREE" },
    { phone: "074126252", password: "R0978012009", status: "FREE" },
    { phone: "074238236", password: "R0978012009", status: "FREE" }
];

app.post('/request-instruction', (req, res) => {
    // Only find an account if the phone isn't provided
    const { phone } = req.body;
    let acc = accounts.find(a => a.phone === phone);
    
    if (!acc) {
        acc = accounts.find(a => a.status === 'FREE');
        if (acc) {
            acc.status = 'IN-USE';
            return res.json({ action: "LOGIN", phone: acc.phone, pass: acc.password });
        }
    }
    res.json({ action: acc && acc.status === 'IN-GAME' ? "STAY_IDLE" : "CONTINUE" });
});

app.post('/update-status', (req, res) => {
    const { phone, status } = req.body;
    let acc = accounts.find(a => a.phone === phone);
    if (acc) acc.status = status;
    res.json({ success: true });
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));
