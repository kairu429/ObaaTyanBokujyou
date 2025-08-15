const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const message = form.querySelector('textarea').value;

    // Discord Webhook URL をここに入れる
    const webhookURL = "https://discord.com/api/webhooks/1405814630454001685/K3shaH2eZ2bNeK4S5USbTWskwrTtuge9dTjG4kiFTLUKsi6QlJ428KIZt32YIOpy7C2u";

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
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("メッセージ送信完了！");
            form.reset();
        } else {
            alert("送信に失敗しました。");
        }
    } catch (error) {
        console.error(error);
        alert("エラーが発生しました。");
    }
});
