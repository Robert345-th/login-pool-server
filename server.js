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
    { phone: "571460072", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573058843", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573135488", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573164297", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573213942", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573271807", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573279568", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573384775", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "573507265", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574015146", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574040623", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574048581", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574076004", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574084944", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574084945", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574084951", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574084958", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574086452", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574093035", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574111341", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574111345", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574125189", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574125193", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574126252", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574128995", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138274", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138365", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138371", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138373", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138374", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574138376", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574145023", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153024", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153025", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153026", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153027", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153031", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153032", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153033", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153091", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153093", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574153094", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574167658", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574167662", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574191028", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574195196", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574195197", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574195202", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574195203", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574203225", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574203227", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574203229", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574203235", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219118", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219727", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219728", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219730", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219767", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219769", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219771", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219772", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219774", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219788", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219794", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219908", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219916", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219917", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574219985", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574222113", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238034", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238038", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238215", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238217", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238234", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238235", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238236", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574238237", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574252030", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574522423", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574543169", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574552423", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574555649", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574555680", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574555706", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574555717", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574559302", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574576597", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574576605", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574576734", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574601393", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574601471", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604175", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604316", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604318", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604322", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604324", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604327", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574604329", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574607021", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574623403", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574623447", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574623467", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574623472", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574638143", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574638147", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574638160", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574641470", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574641473", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574641535", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574641543", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574641548", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574939790", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574939931", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574939954", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574939958", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574940262", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574940273", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574960430", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574960432", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574960435", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574960438", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574976516", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574976553", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574976555", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574976632", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987388", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987392", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987395", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987396", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987429", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987438", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987469", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987540", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "574987708", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "750054275", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "750076052", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "750105130", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "750105475", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760008520", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760017804", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760017807", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760019369", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760020871", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760027462", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760027536", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760037223", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760037324", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760195399", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760266305", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760657486", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760657740", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760658096", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760659173", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760659593", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760660103", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760660319", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760662878", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760664269", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760665924", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760667148", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760667192", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760674231", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760706164", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "760786373", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "761796281", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "761892845", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762007347", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762063486", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762074840", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762145187", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762151365", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762169222", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762169977", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762189866", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762195449", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762231722", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762252702", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762326391", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762482882", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762482887", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483133", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483160", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483161", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483226", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483249", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483440", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483446", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483510", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483593", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483842", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762483933", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484350", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484481", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484532", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484535", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484538", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762484670", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "762578180", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763131867", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763145338", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763147163", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763154094", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763185490", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763185516", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763190212", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763190273", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763194150", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763207608", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763233600", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763525617", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763677963", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "763796091", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764112407", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764315103", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764353412", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764374600", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764464883", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764643223", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764646883", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764647719", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764748154", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764764653", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764884784", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764884969", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764893496", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764894585", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764952884", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764959540", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "764961915", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "765014985", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "765650610", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "765801758", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "765884396", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "766371430", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "766843595", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "766962275", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "767043412", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "767069228", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "767713636", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "768267124", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "768286318", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "768355864", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "768998482", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "768998782", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "769193788", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "769649561", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "769716107", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "769754565", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "770105510", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "770942244", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "777263261", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "778220827", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "778227919", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "778228223", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "778301584", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "778301604", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "779171327", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "779171390", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "779171438", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953583621", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953583623", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953584706", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953658753", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953659386", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "953690649", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "955216051", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "956207230", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "960258667", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "960293652", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "960674231", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "961341025", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "961698321", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962068151", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962206748", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962372176", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962386121", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962871032", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962878301", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "962946692", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963121772", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963160727", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963170043", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963191154", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963193039", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963528239", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963609665", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963629888", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963694417", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963717220", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963841384", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "963876371", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964158220", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964216728", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964218931", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964305408", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964367610", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964548395", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964548910", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964577765", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964597345", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964689702", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964819491", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964834027", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "964918640", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965185421", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965563794", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965606200", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965650610", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965699297", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "965979179", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "966081954", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "966135238", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "966652119", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "966856823", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "967112315", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "967450294", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "967554565", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968019430", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968047294", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968154969", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968274817", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968418911", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968436080", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968437139", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968527450", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968755729", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "968912910", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969017761", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969024404", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969058463", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969193788", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969308398", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969385082", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969486004", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969526174", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969597132", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969729415", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
    { phone: "969757291", password: "R0978012009", status: "FREE", logoutTime: null, logoutTimeStr: null, lastHeartbeat: null },
];

let badPasswordAccounts = [];

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const FREE_ACCOUNT_LOCK_THRESHOLD = 50;
const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;
const LOCK_HOUR = 18;
const LOCK_MINUTE = 0;
const REMOVE_PASSWORD = '1234';
const HEARTBEAT_TIMEOUT_MS = 2 * 60 * 1000;

let poolLocked = false;
let poolLockedReason = '';

function pad(n) { return String(n).padStart(2, '0'); }

// Free accounts after 24h waiting
setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && acc.logoutTime && (now - acc.logoutTime >= TWENTY_FOUR_HOURS_MS)) {
            acc.status = 'FREE'; acc.logoutTime = null; acc.logoutTimeStr = null; acc.lastHeartbeat = null;
        }
    });
}, 60 * 1000);

// Heartbeat timeout check
setInterval(() => {
    const now = Date.now();
    accounts.forEach(acc => {
        if (acc.status === 'IN-USE' && !acc.logoutTime && acc.lastHeartbeat) {
            const elapsed = now - acc.lastHeartbeat;
            if (elapsed > HEARTBEAT_TIMEOUT_MS) {
                const timeStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                console.log(`Heartbeat lost for ${acc.phone}. Moving to waiting.`);
                acc.logoutTime = Date.now();
                acc.logoutTimeStr = timeStr + ' (tab closed)';
            }
        }
    });
}, 10 * 1000);

// Lock/unlock logic: locks at 18:00 or when free <= 50, unlocks at 07:30
setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const freeCount = accounts.filter(a => a.status === 'FREE').length;

    // Unlock at 07:30
    if (poolLocked && (hour > UNLOCK_HOUR || (hour === UNLOCK_HOUR && minute >= UNLOCK_MINUTE)) && hour < LOCK_HOUR) {
        poolLocked = false;
        poolLockedReason = '';
        console.log('Pool unlocked at 07:30.');
        return;
    }

    // Lock at 18:00
    const isAfterLockTime = hour > LOCK_HOUR || (hour === LOCK_HOUR && minute >= LOCK_MINUTE);
    if (!poolLocked && isAfterLockTime) {
        poolLocked = true;
        poolLockedReason = `Pool locked at 18:00. Unlocks at 07:30.`;
        console.log(poolLockedReason);
        return;
    }

    // Lock when free accounts reach threshold
    if (!poolLocked && freeCount <= FREE_ACCOUNT_LOCK_THRESHOLD) {
        poolLocked = true;
        poolLockedReason = `Free accounts reached ${freeCount}. Locked until 07:30.`;
        console.log(poolLockedReason);
    }
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

app.get('/inuse-stats', (req, res) => {
    const list = accounts
        .filter(a => a.status === 'IN-USE' && !a.logoutTime)
        .map(a => ({ phone: a.phone, lastHeartbeat: a.lastHeartbeat }));
    res.json(list);
});

app.post('/heartbeat', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(a => a.phone === phone);
    if (account && account.status === 'IN-USE') {
        account.lastHeartbeat = Date.now();
        return res.json({ success: true });
    }
    res.json({ success: false, error: 'Account not found or not in use.' });
});

function waitingPage(rows) {
    const rowsHtml = rows.length
        ? rows.map((r, i) => `
            <div class="row" data-phone="${r.phone}">
                <div class="row-num">${i + 1}.</div>
                <div class="row-info">
                    <div class="row-phone">${r.phone}</div>
                    <div class="row-countdown" id="cd-${i}">calculating...</div>
                    ${r.logoutTimeStr ? `<div class="row-note">${r.logoutTimeStr}</div>` : ''}
                </div>
            </div>`).join('')
        : `<div class="empty">No accounts</div>`;
    const freeAtData = JSON.stringify(rows.map((r, i) => ({ id: i, freeAt: r.freeAt })));
    return `<!DOCTYPE html>
<html>
<head>
    <title>Waiting 24h</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:sans-serif;background:#04060a;min-height:100vh;padding:20px}
        .page{background:#0d1117;border-radius:16px;width:100%;max-width:520px;margin:0 auto;overflow:hidden}
        .page-header{padding:16px 20px;border-bottom:1px solid #21262d;display:flex;align-items:center;gap:12px}
        .back-btn{background:#161b22;border:1px solid #30363d;color:#8b949e;padding:6px 12px;border-radius:8px;font-size:12px;text-decoration:none;white-space:nowrap}
        .page-title{font-size:15px;font-weight:500;color:#e6edf3}
        .page-subtitle{font-size:11px;color:#4b5563;margin-top:2px}
        .search-wrap{padding:14px 20px;border-bottom:1px solid #21262d}
        .search-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .search-input::placeholder{color:#4b5563}
        .row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #161b22;gap:10px}
        .row:last-child{border-bottom:none}
        .row-num{font-size:12px;color:#4b5563;width:26px;flex-shrink:0}
        .row-info{flex:1;min-width:0}
        .row-phone{font-size:14px;color:#e6edf3;font-weight:500}
        .row-countdown{font-size:11px;color:#fbbf24;margin-top:3px}
        .row-note{font-size:10px;color:#4b5563;margin-top:2px}
        .empty{padding:40px;text-align:center;color:#4b5563;font-size:13px}
        .hidden{display:none}
    </style>
</head>
<body>
<div class="page">
    <div class="page-header">
        <a href="/" class="back-btn">&#8592; Back</a>
        <div>
            <div class="page-title">Waiting 24h</div>
            <div class="page-subtitle">${rows.length} full accounts</div>
        </div>
    </div>
    <div class="search-wrap">
        <input class="search-input" id="search" placeholder="&#128269; Search phone number..." oninput="filterRows(this.value)">
    </div>
    <div id="list">${rowsHtml}</div>
</div>
<script>
    function pad(n){return String(n).padStart(2,'0')}
    const data=${freeAtData};
    function updateCountdowns(){
        const now=Date.now();
        data.forEach(item=>{
            const el=document.getElementById('cd-'+item.id);
            if(!el) return;
            const diff=item.freeAt-now;
            if(diff<=0){el.textContent='Ready to free';el.style.color='#3fb950';}
            else{
                const h=Math.floor(diff/3600000);
                const m=Math.floor((diff%3600000)/60000);
                const s=Math.floor((diff%60000)/1000);
                el.textContent='Free in: '+h+'h '+pad(m)+'m '+pad(s)+'s';
            }
        });
    }
    function filterRows(q){
        document.querySelectorAll('.row').forEach(row=>{
            const phone=row.getAttribute('data-phone')||'';
            row.classList.toggle('hidden',q!==''&&!phone.includes(q));
        });
    }
    setInterval(updateCountdowns,1);updateCountdowns();
</script>
</body>
</html>`;
}

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
                ${type === 'free' || type === 'bad' ? `<button class="rm-btn" onclick="removeAccount('${r.phone}')">Remove</button>` : ''}
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
        .page-title{font-size:15px;font-weight:500;color:#e6edf3}
        .page-subtitle{font-size:11px;color:#4b5563;margin-top:2px}
        .search-wrap{padding:14px 20px;border-bottom:1px solid #21262d}
        .search-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .search-input::placeholder{color:#4b5563}
        .row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #161b22;gap:10px}
        .row:last-child{border-bottom:none}
        .row-num{font-size:12px;color:#4b5563;width:26px;flex-shrink:0}
        .row-info{flex:1;min-width:0}
        .row-phone{font-size:14px;color:#e6edf3;font-weight:500}
        .row-pass{font-size:11px;color:#4b5563;margin-top:2px}
        .row-time{font-size:11px;color:#f87171;margin-top:2px}
        .rm-btn{background:#2d0a0a;border:1px solid #7f1d1d;color:#f87171;padding:4px 10px;border-radius:6px;font-size:11px;cursor:pointer;flex-shrink:0}
        .empty{padding:40px;text-align:center;color:#4b5563;font-size:13px}
        .hidden{display:none}
        .pin-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
        .pin-box{background:#0d1117;border:1.5px solid #21262d;border-radius:16px;padding:28px 24px;width:100%;max-width:320px;text-align:center}
        .pin-title{font-size:15px;font-weight:500;color:#e6edf3;margin-bottom:6px}
        .pin-sub{font-size:12px;color:#4b5563;margin-bottom:20px}
        .pin-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:12px;border-radius:8px;font-size:16px;outline:none;text-align:center;letter-spacing:4px;margin-bottom:14px}
        .pin-row{display:flex;gap:10px}
        .pin-cancel{flex:1;background:#161b22;border:1px solid #30363d;color:#8b949e;padding:10px;border-radius:8px;font-size:13px;cursor:pointer}
        .pin-confirm{flex:1;background:#7f1d1d;border:none;color:#f87171;padding:10px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer}
        .pin-err{color:#f87171;font-size:12px;margin-top:10px;display:none}
    </style>
</head>
<body>
<div class="page">
    <div class="page-header">
        <a href="/" class="back-btn">&#8592; Back</a>
        <div><div class="page-title">${title}</div><div class="page-subtitle">${subtitle}</div></div>
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
    let pendingPhone=null;
    const listType='${type}';
    function removeAccount(phone){pendingPhone=phone;document.getElementById('pin-input').value='';document.getElementById('pin-err').style.display='none';document.getElementById('pin-modal').style.display='flex';setTimeout(()=>document.getElementById('pin-input').focus(),100);}
    function closePin(){pendingPhone=null;document.getElementById('pin-modal').style.display='none';}
    function confirmRemove(){
        const pin=document.getElementById('pin-input').value.trim();
        if(pin!=='1234'){document.getElementById('pin-err').style.display='block';document.getElementById('pin-input').value='';return;}
        const endpoint=listType==='bad'?'/remove-bad-password':'/remove-account';
        fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:pendingPhone,pin})})
        .then(r=>r.json()).then(d=>{
            if(d.success){closePin();const row=document.querySelector('[data-phone="'+pendingPhone+'"]');if(row)row.remove();}
            else{document.getElementById('pin-err').textContent=d.error||'Error';document.getElementById('pin-err').style.display='block';}
        });
    }
    document.getElementById('pin-input').addEventListener('keydown',e=>{if(e.key==='Enter')confirmRemove();if(e.key==='Escape')closePin();});
    function filterRows(q){document.querySelectorAll('.row').forEach(row=>{const phone=row.getAttribute('data-phone')||'';row.classList.toggle('hidden',q!==''&&!phone.includes(q));});}
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
        .free-col{color:#3fb950}.inuse-col{color:#58a6ff}.waiting-col{color:#c4b5fd}.bad-col{color:#fb923c}
        .box-num{font-size:56px;font-weight:500;line-height:1;letter-spacing:-3px;margin-bottom:8px}
        .num-free{color:#3fb950}.num-inuse{color:#58a6ff}.num-waiting{color:#c4b5fd}.num-bad{color:#fb923c}
        .box-desc{font-size:11px;margin-bottom:16px;flex:1;line-height:1.4}
        .desc-free{color:#2a6e3a}.desc-inuse{color:#1e4a7a}.desc-waiting{color:#4a3080}.desc-bad{color:#7a3a10}
        .unlock-timer{font-size:15px;font-weight:500;color:#fff;margin-bottom:3px}
        .unlock-sub{font-size:10px;color:#4b1111;margin-bottom:12px}
        .view-btn{width:100%;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border:none;background:#92400e;color:#fed7aa;text-decoration:none}
        .view-btn:hover{background:#a05213}
        .view-count{background:#fed7aa;color:#92400e;border-radius:20px;padding:1px 8px;font-size:11px;font-weight:700}

        .add-box{background:#0d1117;border:1.5px solid #21262d;border-radius:14px;padding:20px 24px;margin-bottom:20px}
        .add-title{font-size:13px;font-weight:500;color:#8b949e;margin-bottom:14px;letter-spacing:0.5px;text-transform:uppercase}
        .add-row{display:flex;gap:10px;flex-wrap:wrap}
        .add-input{flex:1;min-width:120px;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .add-input::placeholder{color:#4b5563}
        .add-btn{background:#1a3a6e;border:none;color:#a8d0ff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap}

        .footer{display:flex;justify-content:space-between;align-items:center;margin-top:16px}
        .tick{font-size:11px;color:#3fb950;font-family:monospace;opacity:0.7}
        .hint{font-size:10px;color:#252b35}
        .msg{font-size:12px;margin-top:10px;padding:8px 12px;border-radius:6px;display:none}
        .msg-ok{background:#0d4429;color:#3fb950}.msg-err{background:#4b1111;color:#f87171}
        @media(max-width:600px){.four-boxes{grid-template-columns:1fr 1fr}.box-num{font-size:44px}}
        @media(max-width:400px){.four-boxes{grid-template-columns:1fr 1fr}.box-num{font-size:36px}}
        .alert-banner{display:none;background:#1a0a0a;border:1.5px solid #f87171;border-radius:14px;padding:14px 20px;margin-bottom:20px;align-items:center;gap:14px;animation:pulse 1.5s infinite}
        .alert-banner.show{display:flex}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(248,113,113,0.4)}70%{box-shadow:0 0 0 10px rgba(248,113,113,0)}}
        .alert-icon{font-size:22px;flex-shrink:0;animation:blink 0.8s infinite}
        .alert-text{flex:1}
        .alert-title{font-size:13px;font-weight:600;color:#f87171;margin-bottom:3px}
        .alert-sub{font-size:11px;color:#7f2020}
        .alert-dismiss{background:none;border:1px solid #7f1d1d;color:#f87171;padding:5px 12px;border-radius:8px;font-size:11px;cursor:pointer;flex-shrink:0}
    </style>
</head>
<body>
<div class="db">
    <div class="top-bar">
        <div class="db-title">&#128274; Login pool manager</div>
        <div id="pill" class="${poolLocked?'locked-pill':'live-pill'}">
            <div class="${poolLocked?'lock-dot':'live-dot'}"></div>
            ${poolLocked?'Locked':'Live'}
        </div>
    </div>
    <div class="alert-banner" id="alert-banner">
        <div class="alert-icon">&#9888;</div>
        <div class="alert-text">
            <div class="alert-title" id="alert-title">&#128680; Alert — In Use dropped below 45!</div>
            <div class="alert-sub" id="alert-sub">Something happened to your tabs — go and check!</div>
        </div>
        <button class="alert-dismiss" onclick="dismissAlert()">Dismiss</button>
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
        if(cd&&document.getElementById('unlock-block').style.display!=='none'){
            const unlock=new Date();unlock.setHours(7,30,0,0);
            if(unlock<=now)unlock.setDate(unlock.getDate()+1);
            const diff=unlock-now;
            cd.textContent=Math.floor(diff/3600000)+'h '+pad(Math.floor((diff%3600000)/60000))+'m '+pad(Math.floor((diff%60000)/1000))+'s';
        }
    }
    // In-use alert logic: 08:00-17:00 only
    let alertTimer=null;
    let alertTriggered=false;
    let alertDismissed=false;
    let lastInUseCount=45;

    function dismissAlert(){
        alertDismissed=true;
        document.getElementById('alert-banner').classList.remove('show');
    }

    function fireAlert(){
        if(alertDismissed) return;
        if(lastInUseCount===0){
            document.getElementById('alert-title').textContent='🖥️ Go and turn on your computer, it\'s time to work!';
            document.getElementById('alert-sub').textContent='There are no accounts in use right now.';
        } else {
            const missing=45-lastInUseCount;
            document.getElementById('alert-title').textContent='🚨 Alert — In Use dropped below 45!';
            document.getElementById('alert-sub').textContent='Something happened to your '+missing+' tabs — go and check!';
        }
        document.getElementById('alert-banner').classList.add('show');
    }

    function checkInUseAlert(inUseCount){
        const now=new Date();
        const hour=now.getHours();
        lastInUseCount=inUseCount;
        if(hour<8||hour>=17){
            if(alertTimer){clearTimeout(alertTimer);alertTimer=null;}
            return;
        }
        if(inUseCount<45){
            if(!alertTimer&&!alertTriggered){
                const delay=inUseCount===0?60000:600000;
                alertTimer=setTimeout(()=>{
                    alertTriggered=true;
                    alertTimer=null;
                    fireAlert();
                },delay);
            }
        } else {
            if(alertTimer){clearTimeout(alertTimer);alertTimer=null;}
            alertTriggered=false;
            alertDismissed=false;
            document.getElementById('alert-banner').classList.remove('show');
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
                freeLabel.style.color='#f87171';freeLabel.innerHTML='&#128274; Free — Locked';
                freeNum.style.color='#f87171';freeDesc.style.color='#7f2020';freeDesc.textContent=d.reason;
                unlockBlock.style.display='block';
            } else {
                freeBox.style.cssText='background:#0a1a0f;border:1.5px solid #1a4a27;border-radius:16px;padding:20px 16px 16px;display:flex;flex-direction:column;min-width:0;';
                freeLabel.style.color='#3fb950';freeLabel.innerHTML='&#10003; Free';
                freeNum.style.color='#3fb950';freeDesc.style.color='#2a6e3a';freeDesc.textContent='Accounts ready';
                unlockBlock.style.display='none';
            }
            checkInUseAlert(d.inUse);
        }).catch(()=>{});
    }
    function showMsg(text,ok){const el=document.getElementById('add-msg');el.textContent=text;el.className='msg '+(ok?'msg-ok':'msg-err');el.style.display='block';setTimeout(()=>el.style.display='none',3000);}
    function addAccount(){
        const phone=document.getElementById('inp-phone').value.trim();
        const password=document.getElementById('inp-pass').value.trim();
        if(!phone||!password){showMsg('Phone and password required',false);return;}
        fetch('/add-account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,password})})
        .then(r=>r.json()).then(d=>{
            if(d.success){showMsg('Account '+phone+' added!',true);document.getElementById('inp-phone').value='';document.getElementById('inp-pass').value='';refreshStats();}
            else{showMsg(d.error,false);}
        });
    }
    setInterval(update,1);setInterval(refreshStats,1000);update();refreshStats();
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
    const rowsHtml = list.length
        ? list.map((r, i) => `
            <div class="row" data-phone="${r.phone}">
                <div class="row-num">${i + 1}.</div>
                <div class="row-info">
                    <div class="row-phone">${r.phone}</div>
                    <div class="row-hb" id="hb-${i}">&#9679; checking...</div>
                </div>
            </div>`).join('')
        : `<div class="empty">No accounts</div>`;
    res.send(`<!DOCTYPE html>
<html>
<head>
    <title>In Use</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:sans-serif;background:#04060a;min-height:100vh;padding:20px}
        .page{background:#0d1117;border-radius:16px;width:100%;max-width:520px;margin:0 auto;overflow:hidden}
        .page-header{padding:16px 20px;border-bottom:1px solid #21262d;display:flex;align-items:center;gap:12px}
        .back-btn{background:#161b22;border:1px solid #30363d;color:#8b949e;padding:6px 12px;border-radius:8px;font-size:12px;text-decoration:none;white-space:nowrap}
        .page-title{font-size:15px;font-weight:500;color:#e6edf3}
        .page-subtitle{font-size:11px;color:#4b5563;margin-top:2px}
        .search-wrap{padding:14px 20px;border-bottom:1px solid #21262d}
        .search-input{width:100%;background:#161b22;border:1px solid #30363d;color:#e6edf3;padding:10px 14px;border-radius:8px;font-size:13px;outline:none}
        .search-input::placeholder{color:#4b5563}
        .row{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid #161b22;gap:10px}
        .row:last-child{border-bottom:none}
        .row-num{font-size:12px;color:#4b5563;width:26px;flex-shrink:0}
        .row-info{flex:1;min-width:0}
        .row-phone{font-size:14px;color:#e6edf3;font-weight:500}
        .row-hb{font-size:11px;margin-top:3px}
        .hb-alive{color:#3fb950}.hb-warning{color:#fbbf24}.hb-dead{color:#f87171}
        .empty{padding:40px;text-align:center;color:#4b5563;font-size:13px}
        .hidden{display:none}
    </style>
</head>
<body>
<div class="page">
    <div class="page-header">
        <a href="/" class="back-btn">&#8592; Back</a>
        <div><div class="page-title">In Use</div><div class="page-subtitle">${list.length} not yet logged out</div></div>
    </div>
    <div class="search-wrap">
        <input class="search-input" id="search" placeholder="&#128269; Search phone number..." oninput="filterRows(this.value)">
    </div>
    <div id="list">${rowsHtml}</div>
</div>
<script>
    function updateHeartbeats(){
        fetch('/inuse-stats').then(r=>r.json()).then(data=>{
            data.forEach((acc,i)=>{
                const el=document.getElementById('hb-'+i);
                if(!el) return;
                if(!acc.lastHeartbeat){el.className='row-hb hb-warning';el.textContent='⚡ Waiting for first heartbeat...';return;}
                const elapsed=Date.now()-acc.lastHeartbeat;
                const s=Math.floor(elapsed/1000);
                if(elapsed<5000){el.className='row-hb hb-alive';el.textContent='● Heartbeat OK — '+s+'s ago';}
                else if(elapsed<30000){el.className='row-hb hb-warning';el.textContent='◐ Heartbeat slow — '+s+'s ago';}
                else{el.className='row-hb hb-dead';el.textContent='✕ No heartbeat — '+s+'s ago';}
            });
        }).catch(()=>{});
    }
    function filterRows(q){document.querySelectorAll('.row').forEach(row=>{const phone=row.getAttribute('data-phone')||'';row.classList.toggle('hidden',q!==''&&!phone.includes(q));});}
    setInterval(updateHeartbeats,1000);updateHeartbeats();
</script>
</body>
</html>`);
});

app.get('/view/waiting', (req, res) => {
    const list = accounts.filter(a => a.status === 'IN-USE' && a.logoutTime)
        .map(a => ({ phone: a.phone, freeAt: a.logoutTime + TWENTY_FOUR_HOURS_MS, logoutTimeStr: a.logoutTimeStr }));
    res.send(waitingPage(list));
});

app.get('/view/bad', (req, res) => {
    res.send(listPage('Bad Password', badPasswordAccounts.length + ' accounts with wrong password', badPasswordAccounts, 'bad'));
});

app.post('/wrong-password', (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.json({ success: false, error: 'Phone required.' });
    const now = new Date();
    const timeStr = pad(now.getHours()) + ':' + pad(now.getMinutes());
    const index = accounts.findIndex(a => a.phone === phone);
    const acc = index !== -1 ? accounts.splice(index, 1)[0] : { phone, password: 'unknown' };
    if (!badPasswordAccounts.find(a => a.phone === phone)) {
        badPasswordAccounts.push({ phone: acc.phone, password: acc.password, reportedAt: timeStr, status: 'BAD_PASSWORD' });
    }
    res.json({ success: true });
});

app.post('/add-account', (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) return res.json({ success: false, error: 'Phone and password required.' });
    if (accounts.find(a => a.phone === phone)) return res.json({ success: false, error: 'Account already exists.' });
    accounts.push({ phone, password, status: 'FREE', logoutTime: null, logoutTimeStr: null, lastHeartbeat: null });
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
        availableAccount.status = 'IN-USE'; availableAccount.logoutTime = null;
        availableAccount.logoutTimeStr = null; availableAccount.lastHeartbeat = Date.now();
        return res.json({ success: true, phone: availableAccount.phone, password: availableAccount.password });
    }
    return res.json({ success: false, error: "No free accounts available" });
});

app.post('/login', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account && account.status === 'FREE') {
        account.status = 'IN-USE'; account.logoutTime = null;
        account.logoutTimeStr = null; account.lastHeartbeat = Date.now();
        return res.json({ success: true, message: `Account ${phone} marked as logged in.` });
    }
    return res.json({ success: false, error: "Account not available or already in use." });
});

app.post('/logout', (req, res) => {
    const { phone, logoutTime } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account) {
        account.logoutTime = Date.now(); account.logoutTimeStr = logoutTime; account.lastHeartbeat = null;
        return res.json({ success: true, message: `Account ${phone} logged out at ${logoutTime}. Will free after 24h.` });
    }
    return res.json({ success: false, error: "Account not found." });
});

app.post('/aviator-lock', (req, res) => {
    const { phone } = req.body;
    const account = accounts.find(acc => acc.phone === phone);
    if (account) { account.status = 'LOCKED'; return res.json({ success: true }); }
    return res.json({ success: false, error: "Account not found." });
});

app.post('/reset', (req, res) => {
    accounts.forEach(acc => { acc.status = 'FREE'; acc.logoutTime = null; acc.logoutTimeStr = null; acc.lastHeartbeat = null; });
    poolLocked = false; poolLockedReason = '';
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Pool Manager active on port ${PORT}`));
