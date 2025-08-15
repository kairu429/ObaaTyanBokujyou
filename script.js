import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;
import org.json.JSONArray;

public class DiscordWebhook {

    public static void sendWebhook(String name, String message) {
        try {
            String webhookURL = "https://discord.com/api/webhooks/1405814631288799343/WaFUH_m9SOT0KNft-YvHJj2zxTwVuZYx8lkBOsGAmtvzm4Y7cFLLCW40m9IUbcA5J4xX";

            URL url = new URL(webhookURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // 埋め込み用JSON作成
            JSONObject embed = new JSONObject();
            embed.put("title", "おばあちゃん牧場 お問い合わせ");
            embed.put("color", 0x00FF00);

            JSONArray fields = new JSONArray();
            fields.put(new JSONObject().put("name", "名前").put("value", name));
            fields.put(new JSONObject().put("name", "メッセージ").put("value", message));

            embed.put("fields", fields);

            JSONObject payload = new JSONObject();
            payload.put("embeds", new JSONArray().put(embed));

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

    public static void main(String[] args) {
        sendWebhook("田中花子", "こんにちは！ネタサイト面白いです！");
    }
}
