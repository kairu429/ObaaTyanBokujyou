import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;

public class DiscordWebhook {

    public static void sendWebhook(String name, String email, String message) {
        try {
            String webhookURL = "https://discord.com/api/webhooks/1405814631288799343/WaFUH_m9SOT0KNft-YvHJj2zxTwVuZYx8lkBOsGAmtvzm4Y7cFLLCW40m9IUbcA5J4x";

            URL url = new URL(webhookURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // 埋め込み用JSON作成
            JSONObject embed = new JSONObject();
            embed.put("title", "おばあちゃん牧場 お問い合わせ");
            embed.put("color", 0x00FF00); // 緑
            embed.put("fields", new org.json.JSONArray()
                    .put(new JSONObject().put("name", "名前").put("value", name))
                    .put(new JSONObject().put("name", "メール").put("value", email))
                    .put(new JSONObject().put("name", "メッセージ", "value", message))
            );

            JSONObject payload = new JSONObject();
            payload.put("embeds", new org.json.JSONArray().put(embed));

            OutputStream os = conn.getOutputStream();
            os.write(payload.toString().getBytes());
            os.flush();
            os.close();

            int responseCode = conn.getResponseCode();
            System.out.println("Webhook Response Code: " + responseCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 動作テスト
    public static void main(String[] args) {
        sendWebhook("田中花子", "hanako@example.com", "こんにちは！ネタサイト面白いです！");
    }
}
