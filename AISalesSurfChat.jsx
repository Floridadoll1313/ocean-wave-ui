import { useState } from "react";
import { sendChat } from "../services/api";

export default function AISalesSurfChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const data = await sendChat(message);
      setResponse(data.text);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong catching this wave.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask the surfer AI anything..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Paddling..." : "Send"}
      </button>
      {response && <div>{response}</div>}
    </div>
  );
}