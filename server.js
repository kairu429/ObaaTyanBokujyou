const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Webhook URL はここにだけ置く
const WEBHOOK_URL = "https://discord.com/api/webhooks/XXXXXXXX/XXXXXXXX";

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/send", async (req, res) => {
    const { name, message } = req.body;

    const payload = {
        embeds: [{
            title: "おばあちゃん牧場 お問い合わせ",
            color: 0x00FF00,
            fields: [
                { name: "名前", value: name },
                { name: "メッセージ", value: message }
            ]
        }]
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
