const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const message = form.querySelector('textarea').value;

    try {
        const res = await fetch("/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        const data = await res.json();
        if (data.success) {
            alert("メッセージ送信完了！");
            form.reset();
        } else {
            alert("送信に失敗しました。");
        }
    } catch (err) {
        console.error(err);
        alert("エラーが発生しました。");
    }
});
